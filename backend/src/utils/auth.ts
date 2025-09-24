import { supabase } from './database';
import { User } from '@supabase/supabase-js';

// Create a client for authentication operations
export const createSupabaseClient = () => {
  return supabase;
};

// Verify JWT token from Supabase Auth
export const verifySupabaseToken = async (token: string): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error('Token verification error:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Get user profile from our custom users table
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Create or update user profile
export const upsertUserProfile = async (user: {
  id: string;
  email: string;
  name?: string;
  role?: 'customer' | 'admin';
}) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        email: user.email,
        name: user.name || user.email.split('@')[0],
        role: user.role || 'customer',
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting user profile:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error upserting user profile:', error);
    throw error;
  }
};

// Check if user is admin
export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const profile = await getUserProfile(userId);
    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Extract token from Authorization header
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
};