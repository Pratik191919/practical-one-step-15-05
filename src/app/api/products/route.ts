import { NextResponse } from 'next/server';
import { Product } from '@/lib/types';

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '3',
    name: 'Professional Camera',
    description: 'Capture stunning photos with professional-grade  professional-grade digital camera',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww',
  },
  {
    id: '4',
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with the latest graphics and processing power.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '5',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with premium sound quality and long battery life.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '6',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with premium audio quality.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '7',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard with customizable keys.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '8',
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with adjustable DPI settings.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91c2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '9',
    name: '4K Monitor',
    description: 'Ultra-wide 4K monitor perfect for gaming and professional work.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '10',
    name: 'Wireless Charger',
    description: 'Fast wireless charging pad compatible Qi-enabled devices.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '11',
    name: 'Smart LED TV',
    description: '55-inch 4K Smart TV with built-in streaming apps.',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHZ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '12',
    name: 'Portable SSD',
    description: '1TB portable SSD with lightning-fast transfer speeds.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3NkfGVufDB8fDB8fHww',
  },
  {
    id: '13',
    name: 'Gaming Chair',
    description: 'Ergonomic gaming chair with adjustable lumbar support.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '14',
    name: 'Smart Doorbell',
    description: 'Video doorbell with motion detection and two-way audio.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9vcmJlbGx8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '15',
    name: 'Smart Thermostat',
    description: 'Wi-Fi enabled smart thermostat with energy saving features.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlcm1vc3RhdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '16',
    name: 'Smart Light Bulbs',
    description: 'Set of 4 smart LED bulbs with voice control and scheduling.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHQlMjBidWxifGVufDB8fDB8fHww',
  }
];

export async function GET() {
  return NextResponse.json(products);
} 