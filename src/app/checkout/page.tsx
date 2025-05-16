'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Product, PaymentFormData } from '@/lib/types';
import { useCart } from '@/lib/context/CartContext';
import ProductList from '@/components/checkout/ProductList';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentForm from '@/components/checkout/PaymentForm';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>(cartItems);
  const [token, setToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleQuantityChange = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    const hasProducts = products.some((p) => (p.quantity || 0) > 0);
    if (!hasProducts) {
      throw new Error('Please select at least one product.');
    }
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message);
    }
    setToken(result.token);
    setSuccess(true);
    clearCart();
    setProducts([]);
  };

  const handleReset = () => {
    setSuccess(false);
    setToken(null);
    router.push('/');
  };

  const hasProducts = products.some((p) => (p.quantity || 0) > 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <ProductList onQuantityChange={handleQuantityChange} reset={success} />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              {!success ? (
                <PaymentForm onSubmit={handlePaymentSubmit} disabled={!hasProducts} />
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2 text-green-600">Payment Successful!</h2>
                  <p className="mb-4 text-black">Thank you for your purchase.</p>
                  <button
                    onClick={handleReset}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    New Order
                  </button>
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-4 text-xs">
              <strong className="text-black">Debug/Token:</strong>
              <div className="break-all mt-2 text-black min-h-[24px]">
                {token || 'No token generated yet.'}
              </div>
            </div>
          </div>
          <div>
            <OrderSummary products={products} />
          </div>
        </div>
      </div>
    </div>
  );
} 