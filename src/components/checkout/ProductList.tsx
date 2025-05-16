'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/context/CartContext';

interface ProductListProps {
  onQuantityChange: (products: Product[]) => void;
  reset?: boolean;
}

export default function ProductList({ onQuantityChange, reset }: ProductListProps) {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      setProducts(cartItems);
    }
  }, [cartItems, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reset && mounted) {
      setProducts([]);
    }
  }, [reset, mounted]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (!mounted) return;
    
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
    onQuantityChange(updatedProducts);
  };

  const handleRemoveProduct = (productId: string) => {
    if (!mounted) return;
    
    removeFromCart(productId);
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    onQuantityChange(updatedProducts);
  };

  const handleClearAll = () => {
    if (!mounted) return;
    
    clearCart();
    setProducts([]);
    onQuantityChange([]);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">Your Cart</h2>
        {products.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear All
          </button>
        )}
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Your cart is empty</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-white"
          >
            <div>
              <h3 className="font-medium text-black">{product.name}</h3>
              <p className="text-black font-medium">Rs. {product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      Math.max(0, (product.quantity || 0) - 1)
                    )
                  }
                  className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 text-black font-medium transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-black font-medium">{product.quantity || 0}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      (product.quantity || 0) + 1
                    )
                  }
                  className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 text-black font-medium transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="text-red-600 hover:text-red-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function DebugToken({ token }: { token: string | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 text-xs">
      <strong className="text-black">Debug/Token:</strong>
      <div className="break-all mt-2 text-black min-h-[24px]">{token || 'No token generated yet.'}</div>
    </div>
  );
} 