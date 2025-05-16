'use client';

import { useState, useEffect } from 'react';
import { CartProvider } from '@/lib/context/CartContext';

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <CartProvider>{children}</CartProvider>;
} 