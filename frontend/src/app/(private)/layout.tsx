import React from "react";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/cartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <main className="w-full min-h-screen max-h-max bg-zinc-100">
        <Header />
        <Toaster />
        {children}
      </main>
    </CartProvider>
  );
}
