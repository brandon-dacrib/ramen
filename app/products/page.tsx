'use client';

import React, { useEffect, useState } from 'react';
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
    name: 'Tonkotsu Ramen Premium',
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
  {
    id: '5',
    name: 'Shoyu Ramen Traditional',
    description: 'Light soy sauce-based broth with a delicate flavor profile',
    price: 2.69,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
    category: 'Japanese',
    stock: 35,
    featured: false,
  },
  {
    id: '6',
    name: 'Kimchi Ramen Fusion',
    description: 'Spicy Korean kimchi ramen with fermented vegetables',
    price: 3.19,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    category: 'Korean',
    stock: 28,
    featured: true,
  },
  {
    id: '7',
    name: 'Beef Pho Inspired',
    description: 'Vietnamese-inspired beef noodle soup with aromatic herbs',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
    category: 'Vietnamese',
    stock: 22,
    featured: false,
  },
  {
    id: '8',
    name: 'Vegetarian Miso',
    description: 'Plant-based miso ramen with tofu and vegetables',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop',
    category: 'Vegetarian',
    stock: 45,
    featured: false,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = ['All', 'Korean', 'Japanese', 'Thai', 'Vietnamese', 'Vegetarian'];

  useEffect(() => {
    // In a real app, this would fetch from your API
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of premium ramen noodles from around the world.
            From spicy Korean favorites to traditional Japanese classics.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-ramen-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ramen-red focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}