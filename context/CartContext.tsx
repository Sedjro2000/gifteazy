'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  name: string;
  price: string;
  imageUrl: string;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    // Charger le panier depuis l'API ou le localStorage à la connexion
    const loadCart = async () => {
      if (session) {
        const response = await fetch('/api/cart');
        const data = await response.json();
        setCartItems(data.items || []);
      }
    };

    loadCart();
  }, [session]);

  // Fonction pour ajouter un produit au panier
  const addToCart = async (item: CartItem) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
    });

    if (response.ok) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.productId === item.productId);
        if (existingItem) {
          return prevItems.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          return [...prevItems, item];
        }
      });
    }
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = async (productId: string) => {
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    }
  };

  // Fonction pour vider le panier
  const clearCart = async () => {
    const response = await fetch('/api/cart', { method: 'DELETE' });

    if (response.ok) {
      setCartItems([]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
