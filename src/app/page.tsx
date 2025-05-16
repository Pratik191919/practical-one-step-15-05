import { Product } from '@/lib/types';
import ProductGrid from '@/components/home/ProductGrid';
import Link from 'next/link';

async function getProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative mb-8">
          <h1 className="text-3xl font-bold text-black text-center">Our Products</h1>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Link 
              href="/checkout" 
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <span>Cart</span>
            </Link>
          </div>
        </div>
        <ProductGrid initialProducts={products} />
      </div>
    </main>
  );
}
