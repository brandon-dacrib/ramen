'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore, useAuthStore } from '@/lib/store';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { items } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-ramen-red">🍜</div>
            <span className="text-xl font-bold text-gray-900">RamenShop</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-ramen-red transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-ramen-red transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-ramen-red transition-colors">
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ramen-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <UserIcon className="h-6 w-6 text-gray-700" />
                  <span className="text-gray-700">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-ramen-red transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 bg-ramen-red text-white rounded-lg hover:bg-ramen-red/90 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;