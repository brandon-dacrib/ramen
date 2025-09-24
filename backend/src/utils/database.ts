import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database schema interfaces
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_id?: string;
  shipping_address: Address;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error);
  if (error.code) {
    switch (error.code) {
      case '23505': // Unique constraint violation
        throw new Error('Record already exists');
      case '23503': // Foreign key constraint violation
        throw new Error('Referenced record not found');
      case '42P01': // Table does not exist
        throw new Error('Database table not found');
      default:
        throw new Error(`Database error: ${error.message}`);
    }
  }
  throw new Error(error.message || 'Database operation failed');
}

// Initialize database tables (for development/setup)
export async function initializeDatabase() {
  try {
    // Check if tables exist by trying to select from them
    const { error: productsError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (productsError && productsError.code === '42P01') {
      console.log('Database tables need to be created. Please run the Supabase migrations.');
      console.log('Visit your Supabase dashboard or use the SQL editor to create the required tables.');
    }

    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}