import axios from 'axios';
import { Product, Order, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      try {
        const parsed = JSON.parse(token);
        if (parsed.state?.token) {
          config.headers.Authorization = `Bearer ${parsed.state.token}`;
        }
      } catch (e) {
        console.warn('Failed to parse auth token');
      }
    }
  }
  return config;
});

// Products API
export const productsApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getFeatured: () => api.get<Product[]>('/products/featured'),
  getByCategory: (category: string) => api.get<Product[]>(`/products/category/${category}`),
};

// Orders API
export const ordersApi = {
  create: (orderData: any) => api.post<Order>('/orders', orderData),
  getByUser: (userId: string) => api.get<Order[]>(`/orders/user/${userId}`),
  getById: (id: string) => api.get<Order>(`/orders/${id}`),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
};

// Auth API
export const authApi = {
  login: (email: string, password: string) => 
    api.post<{ user: User; token: string }>('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) => 
    api.post<{ user: User; token: string }>('/auth/register', { email, password, name }),
  verifyToken: () => api.get<User>('/auth/verify'),
};

// Payment API
export const paymentApi = {
  createPaymentIntent: (amount: number, currency = 'usd') =>
    api.post<{ clientSecret: string }>('/payments/create-intent', { amount, currency }),
  confirmPayment: (paymentIntentId: string, orderId: string) =>
    api.post('/payments/confirm', { paymentIntentId, orderId }),
};

export default api;