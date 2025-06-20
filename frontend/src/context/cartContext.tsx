'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  cart: CartProduct[];
  addQuantity: (productId: string) => void;
  removeQuantity: (productId: string) => void;
  addToCart: (product: Omit<CartProduct, 'quantity' | 'totalPrice'>) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && cart.length >= 0) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Erro ao salvar carrinho:', error);
      }
    }
  }, [cart, isClient]);

  const addQuantity = (productId: string) => {
    setCart(prevCart => 
      prevCart.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              quantity: product.quantity + 1,
              totalPrice: product.unitPrice * (product.quantity + 1)
            }
          : product
      )
    );
  };

  const removeQuantity = (productId: string) => {
    setCart(prevCart => 
      prevCart.map(product => 
        product.id === productId && product.quantity > 1
          ? { 
              ...product, 
              quantity: product.quantity - 1,
              totalPrice: product.unitPrice * (product.quantity - 1)
            }
          : product
      ).filter(product => product.quantity > 0)
    );
  };

  const addToCart = (product: Omit<CartProduct, 'quantity' | 'totalPrice'>) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.unitPrice * (item.quantity + 1)
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
            totalPrice: product.unitPrice
          }
        ];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(product => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, product) => total + product.totalPrice, 0);
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const isInCart = (productId: string): boolean => {
    return cart.some(product => product.id === productId);
  };

  const value: CartContextType = {
    cart,
    addQuantity,
    removeQuantity,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
