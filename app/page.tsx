'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { SparklesIcon, BeakerIcon, GlobeAltIcon, TruckIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';

// Mock data for development - Updated to be clear about flavor packets
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Shin Ramyun Spicy Flavor Packet',
    description: 'Authentic Korean spicy flavor concentrate - just add to your noodles! Rich beef and vegetable seasonings in a convenient packet.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    category: 'Korean',
    stock: 50,
    featured: true,
  },
  {
    id: '2',
    name: 'Tonkotsu Flavor Packet',
    description: 'Rich pork bone broth seasoning packet with authentic Japanese flavors. Transform any noodles into restaurant-quality ramen.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
    category: 'Japanese',
    stock: 30,
    featured: true,
  },
  {
    id: '3',
    name: 'Miso Flavor Packet Classic',
    description: 'Traditional miso-based flavor concentrate with corn and green onion seasonings. Premium flavor packet for authentic taste.',
    price: 2.89,
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop',
    category: 'Japanese',
    stock: 40,
    featured: false,
  },
  {
    id: '4',
    name: 'Thai Tom Yum Flavor Packet',
    description: 'Spicy and sour Thai-style seasoning packet with lemongrass and lime. Concentrated flavors for the perfect Tom Yum experience.',
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="animate-slide-down">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-tight">
                Premium Ramen
                <span className="block text-gradient bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Flavor Packets
                </span>
              </h1>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 max-w-4xl mx-auto font-light leading-relaxed">
                Transform your noodles with authentic flavor concentrates from around the world
              </p>
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
                We sell premium seasoning packets - just add your own noodles for restaurant-quality ramen at home!
              </p>
            </div>
            
            <div className="animate-scale-in flex flex-col sm:flex-row gap-4 justify-center items-center" style={{animationDelay: '0.4s'}}>
              <Link
                href="/products"
                className="group relative inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold text-lg rounded-2xl hover:bg-neutral-50 transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <SparklesIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Shop Flavor Packets
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-2xl hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <BeakerIcon className="w-5 h-5 mr-2" />
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              How FlavorCraft Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Three simple steps to transform your noodles into authentic ramen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group hover-lift">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-400 rounded-full animate-pulse-glow"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Choose Your Flavor</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Select from our curated collection of authentic flavor packets from Japan, Korea, Thailand, and beyond.
              </p>
            </div>
            
            <div className="text-center group hover-lift">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-3xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.5s'}}></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Add Your Noodles</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Use any noodles you prefer - fresh, dried, or instant. Our flavor packets work with everything!
              </p>
            </div>
            
            <div className="text-center group hover-lift">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-primary-500 rounded-3xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-400 rounded-full animate-pulse-glow" style={{animationDelay: '1s'}}></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Enjoy Perfect Ramen</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Mix our concentrated flavor packet with hot water and your noodles. Restaurant-quality ramen in minutes!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              Featured Flavor Packets
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Hand-picked favorites from our premium collection of authentic seasonings
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-lg rounded-2xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <GlobeAltIcon className="w-5 h-5 mr-2" />
              Explore All Flavors
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              Why Choose FlavorCraft?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We're passionate about bringing you the most authentic and convenient ramen experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <TruckIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Lightning Fast Delivery</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Get your flavor packets delivered in 1-2 business days anywhere in the US with our express shipping
              </p>
            </div>
            
            <div className="text-center group hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <GlobeAltIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Authentic Global Flavors</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Sourced directly from Japan, Korea, Thailand, and other Asian countries for the most authentic taste
              </p>
            </div>
            
            <div className="text-center group hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <ShieldCheckIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Premium Quality Guarantee</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Only the highest quality ingredients and traditional recipes. 100% satisfaction guaranteed or your money back
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-neutral-600">
              Join thousands of satisfied flavor enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                rating: 5,
                comment: "These flavor packets are incredible! I can make authentic ramen with my own noodles. The Tonkotsu packet tastes just like the ramen shops in Tokyo.",
                location: "San Francisco, CA"
              },
              {
                name: "Mike Rodriguez",
                rating: 5,
                comment: "Game changer for my meal prep! I buy bulk noodles and use different FlavorCraft packets throughout the week. So convenient and delicious.",
                location: "Austin, TX"
              },
              {
                name: "Emily Watson",
                rating: 5,
                comment: "As a college student, these are perfect. Way better than regular instant ramen and I can control exactly what noodles I use. Love the variety!",
                location: "Boston, MA"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover-lift">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t border-neutral-100 pt-4">
                  <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                  <p className="text-neutral-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}