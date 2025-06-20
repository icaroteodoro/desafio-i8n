import React from "react";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/cartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <main className="w-full h-screen">
        <Header />
        <Toaster />
        {children}
      </main>
    </CartProvider>
  );
}
