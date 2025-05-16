'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

interface OrderSummaryProps {
  products: Product[];
}

export default function OrderSummary({ products }: OrderSummaryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = products.reduce(
    (sum, product) => sum + (product.price * (product.quantity || 0)),
    0
  );
  const tax = subtotal * 0.1; 
  const total = subtotal + tax;

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-black">Subtotal</span>
          <span className="text-black">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Tax (10%)</span>
          <span className="text-black">Rs. {tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span className="text-black">Total</span>
            <span className="text-black">Rs. {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 