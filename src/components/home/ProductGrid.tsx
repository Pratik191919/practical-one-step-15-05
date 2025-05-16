'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/context/CartContext';
import Link from 'next/link';

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const router = useRouter();
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProducts(initialProducts.map(product => ({ ...product, quantity: 0 })));
  }, [initialProducts]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, quantity: Math.max(0, newQuantity) }
        : product
    ));
  };

  const handleAddToCart = (product: Product) => {
    if (product.quantity && product.quantity > 0) {
      addToCart(product);
      router.push('/checkout');
    }
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId);
  };

  if (!mounted) {
    return null;
  }

  if (products.length === 0) {
    return <div className="text-black">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      {cartItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-blue-600" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                  clipRule="evenodd" 
                />
              </svg>
              <p className="text-blue-800 font-medium">
                You have {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'} in your cart
              </p>
            </div>
            <Link 
              href="/checkout" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors"
            >
              <span>View Cart</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2 text-black">{product.name}</h3>
              <p className="text-black text-sm mb-4">{product.description}</p>
              <div className="flex justify-center mb-4">
                <span className="text-xl font-bold text-black">Rs. {product.price.toFixed(2)}</span>
              </div>
              {isProductInCart(product.id) ? (
                <div className="text-center py-4">
                  <p className="text-blue-600 font-medium mb-2">This product is in your cart</p>
                  <Link 
                    href="/checkout" 
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-1 transition-colors"
                  >
                    <span>Check cart page to manage quantity</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(product.id, (product.quantity || 0) - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-100 hover:bg-gray-200 text-black font-medium transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-black font-medium">{product.quantity || 0}</span>
                      <button
                        onClick={() => handleQuantityChange(product.id, (product.quantity || 0) + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-100 hover:bg-gray-200 text-black font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="border-t pt-2 mb-4">
                    <div className="flex justify-center text-sm">
                      <span className="text-black mr-2">Subtotal:</span>
                      <span className="font-semibold text-black">
                        Rs. {((product.quantity || 0) * product.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.quantity || product.quantity === 0}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 