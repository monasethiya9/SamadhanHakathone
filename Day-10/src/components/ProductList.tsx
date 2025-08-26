import React, { useState } from 'react';
import { ProductCard, Product } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 2847,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics",
    isOnSale: true
  },
  {
    id: 2,
    name: "Minimalist Watch Collection",
    price: 159.99,
    rating: 4.6,
    reviewCount: 1523,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Professional Camera Lens",
    price: 899.99,
    originalPrice: 1099.99,
    rating: 4.9,
    reviewCount: 856,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Photography",
    isOnSale: true
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 449.99,
    rating: 4.5,
    reviewCount: 643,
    image: "https://images.pexels.com/photos/6186/office-sitting-furniture-work.jpg?auto=compress&cs=tinysrgb&w=800",
    category: "Furniture"
  },
  {
    id: 5,
    name: "Smart Fitness Tracker",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.4,
    reviewCount: 2156,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Health & Fitness",
    isOnSale: true
  },
  {
    id: 6,
    name: "Artisan Coffee Beans",
    price: 24.99,
    rating: 4.7,
    reviewCount: 892,
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Food & Beverage"
  }
];

export const ProductList: React.FC = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const handleAddToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    // Simple feedback - in a real app you'd show a toast notification
    setTimeout(() => {
      setCartItems(prev => prev.filter(id => id !== productId));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-6">
            <ShoppingBag className="text-blue-600" size={24} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our curated collection of premium products designed to elevate your lifestyle
          </p>
        </div>

        {/* Cart Counter */}
        {cartItems.length > 0 && (
          <div className="fixed top-6 right-6 z-50">
            <div className="bg-emerald-500 text-white rounded-full px-4 py-2 shadow-lg animate-pulse">
              <span className="font-semibold">{cartItems.length} items added!</span>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};