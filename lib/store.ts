import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, CartState, Product, CartItem, User } from '@/types';

// Auth Store
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          // This would call your API
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          if (!response.ok) throw new Error('Login failed');
          
          const { user, token } = await response.json();
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      register: async (email: string, password: string, name: string) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
          });
          
          if (!response.ok) throw new Error('Registration failed');
          
          const { user, token } = await response.json();
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
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