'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock data for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Shin Ramyun Spicy',
    description: 'Authentic Korean spicy ramen with rich beef flavor and vegetables',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    category: 'Korean',
    stock: 50,
    featured: true,
  },
  {
    id: '2',
    name: 'Tonkotsu Ramen',
    description: 'Rich pork bone broth ramen with authentic Japanese flavors',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
    category: 'Japanese',
    stock: 30,
    featured: true,
  },
  {
    id: '3',
    name: 'Miso Ramen Classic',
    description: 'Traditional miso-based ramen with corn and green onions',
    price: 2.89,
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop',
    category: 'Japanese',
    stock: 40,
    featured: false,
  },
  {
    id: '4',
    name: 'Thai Tom Yum',
    description: 'Spicy and sour Thai-style instant noodles with lemongrass',
    price: 2.79,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    category: 'Thai',
    stock: 25,
    featured: true,
  },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from your API
    setFeaturedProducts(mockProducts.filter(p => p.featured));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ramen-red to-ramen-orange text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Ramen Noodles
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover authentic flavors from around the world. 
            From spicy Korean kimchi to rich Japanese tonkotsu - we have it all!
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-ramen-red px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">
              Hand-picked favorites from our premium collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-ramen-red text-white px-6 py-3 rounded-lg hover:bg-ramen-red/90 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your favorite ramen delivered in 2-3 business days anywhere in the US
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">Authentic Flavors</h3>
              <p className="text-gray-600">
                Sourced directly from Japan, Korea, Thailand, and other Asian countries
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Only the highest quality ingredients and traditional recipes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}