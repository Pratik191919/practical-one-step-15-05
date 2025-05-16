import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProviderWrapper from "@/components/providers/CartProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Practical-oneStep",
  description: "Practical of product listing with payment functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <CartProviderWrapper>{children}</CartProviderWrapper>
      </body>
    </html>
  );
}
