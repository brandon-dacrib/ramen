import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, Product, CartItem } from '@/types';
import { supabase, getCurrentUser, getUserProfile, UserProfile } from './supabase';
import { User } from '@supabase/supabase-js';

// Updated Auth State interface
interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

// Auth Store using Supabase
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userProfile: null,
      isAuthenticated: false,
      loading: true,
      login: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          if (data.user) {
            const profile = await getUserProfile(data.user.id);
            set({ 
              user: data.user, 
              userProfile: profile,
              isAuthenticated: true,
              loading: false 
            });
          }
        } catch (error: any) {
          console.error('Login error:', error);
          throw new Error(error.message || 'Login failed');
        }
      },
      register: async (email: string, password: string, name: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
              }
            }
          });
          
          if (error) throw error;
          
          if (data.user) {
            // The user profile will be created automatically via database trigger
            // Wait a moment for the trigger to complete
            setTimeout(async () => {
              const profile = await getUserProfile(data.user!.id);
              set({ 
                user: data.user, 
                userProfile: profile,
                isAuthenticated: true,
                loading: false 
              });
            }, 1000);
          }
        } catch (error: any) {
          console.error('Registration error:', error);
          throw new Error(error.message || 'Registration failed');
        }
      },
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({ 
            user: null, 
            userProfile: null, 
            isAuthenticated: false,
            loading: false 
          });
        } catch (error: any) {
          console.error('Logout error:', error);
        }
      },
      initializeAuth: async () => {
        try {
          const { data: { user }, error } = await supabase.auth.getUser();
          
          if (error) {
            console.error('Auth initialization error:', error);
            set({ loading: false });
            return;
          }
          
          if (user) {
            const profile = await getUserProfile(user.id);
            set({ 
              user, 
              userProfile: profile,
              isAuthenticated: true,
              loading: false 
            });
          } else {
            set({ 
              user: null, 
              userProfile: null, 
              isAuthenticated: false,
              loading: false 
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        // Only persist essential data, not the full user object
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Cart Store
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product: Product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);
        
        let newItems: CartItem[];
        if (existingItem) {
          newItems = items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...items, { product, quantity }];
        }
        
        const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        set({ items: newItems, total });
      },
      removeItem: (productId: string) => {
        const items = get().items.filter(item => item.product.id !== productId);
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        set({ items, total });
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        const items = get().items.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        set({ items, total });
      },
      clearCart: () => {
        set({ items: [], total: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export { useAuthStore, useCartStore };