'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { PlusIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🍜',
      style: {
        borderRadius: '16px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'korean':
        return '🌶️';
      case 'japanese':
        return '🍜';
      case 'thai':
        return '🌿';
      default:
        return '🥢';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'korean':
        return 'from-red-500 to-orange-500';
      case 'japanese':
        return 'from-blue-500 to-purple-500';
      case 'thai':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-primary-500 to-secondary-500';
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-large transition-all duration-500 hover-lift">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getCategoryColor(product.category)} backdrop-blur-sm`}>
          <span className="mr-1">{getCategoryIcon(product.category)}</span>
          {product.category}
        </div>
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 text-white animate-pulse-glow">
            <SparklesIcon className="w-4 h-4" />
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            product.stock > 20 
              ? 'bg-green-500/80 text-white' 
              : product.stock > 0 
              ? 'bg-yellow-500/80 text-white' 
              : 'bg-red-500/80 text-white'
          }`}>
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Flavor Packet Highlight */}
        <div className="flex items-center mb-4 p-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-3">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-700">Flavor Packet</p>
            <p className="text-2xs text-neutral-500">Just add noodles!</p>
          </div>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-neutral-500 font-medium">
              per packet
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`group/btn relative flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              product.stock === 0
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 hover:scale-105 hover:shadow-glow active:scale-95'
            }`}
          >
            <PlusIcon className="h-4 w-4 group-hover/btn:rotate-90 transition-transform duration-300" />
            <span>Add to Cart</span>
            {product.stock > 0 && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-secondary-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            )}
          </button>
        </div>
        
        {/* Quick Info Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-2xs font-medium bg-neutral-100 text-neutral-700">
            <FireIcon className="w-3 h-3 mr-1" />
            Authentic
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-2xs font-medium bg-neutral-100 text-neutral-700">
            ⚡ Instant
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-2xs font-medium bg-neutral-100 text-neutral-700">
            🌱 Premium
          </span>
        </div>
      </div>
      
      {/* Hover Effect Gradient Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
    </div>
  );
};

export default ProductCard;