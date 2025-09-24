'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore, useAuthStore } from '@/lib/store';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { items } = useCartStore();
  const { userProfile, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">🍜</div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                FlavorCraft
              </span>
              <span className="text-2xs text-neutral-500 font-medium -mt-1 hidden sm:block">
                Premium Flavor Packets
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="relative group px-3 py-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="relative group px-3 py-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Flavor Packets
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="relative group px-3 py-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 lg:p-3 hover:bg-primary-50 rounded-xl transition-all duration-300 group">
              <ShoppingCartIcon className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-700 group-hover:text-primary-600 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold animate-pulse-glow">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* User Menu - Desktop */}
            {isAuthenticated ? (
              <div className="relative group hidden lg:block">
                <button className="flex items-center space-x-2 p-2 lg:p-3 hover:bg-primary-50 rounded-xl transition-all duration-300">
                  <UserIcon className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-700 group-hover:text-primary-600 transition-colors" />
                  <span className="text-neutral-700 font-medium max-w-24 truncate">
                    {userProfile?.name || 'User'}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-large border border-neutral-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Link href="/profile" className="flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <UserIcon className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  <Link href="/orders" className="flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <SparklesIcon className="w-4 h-4 mr-3" />
                    Orders
                  </Link>
                  <hr className="my-2 border-neutral-100" />
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link href="/login" className="px-4 py-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                  Login
                </Link>
                <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold hover:scale-105 hover:shadow-glow">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-primary-50 transition-colors"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-neutral-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-neutral-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 shadow-large">
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/" 
              className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Flavor Packets
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="px-4 py-2 text-sm text-neutral-500 font-medium">
                  {userProfile?.name || 'User'}
                </div>
                <Link 
                  href="/profile" 
                  className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  href="/orders" 
                  className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-neutral-200 pt-4 space-y-3">
                <Link 
                  href="/login" 
                  className="block px-4 py-3 text-center text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="block px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;