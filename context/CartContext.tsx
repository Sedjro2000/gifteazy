'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data: session } = useSession();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  {/*useEffect(() => {
    const loadCart = async () => {
      if (session) {
        console.log('Session active, loading cart...'); 
        try {
          const response = await fetch('/api/cart');
          const data = await response.json();
          console.log('Cart items loaded from API:', data.items); 
          setCartItems(data.items || []);
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        console.log('No session, skipping cart load');
      }
    };
    loadCart();
  }, [session]);
  useEffect(() => {
    console.log('Cart items state updated:', cartItems);
  }, [cartItems]);*/}


  useEffect(() => {
    const loadCart = async () => {
      if (session) {
        console.log('Session active, loading cart...'); 
      } else {
        console.log('No session, attempting to load cart anyway...'); 
      }
      
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        console.log('Cart items loaded from API:', data.items); 
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []); 
  
  
  
  const addToCart = useCallback(async (item: CartItem) => {
    console.log('Adding to cart:', item); 
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      
      const updatedCart = await response.json();
      console.log('Updated cart after adding item:', updatedCart); 
  
      
      setCartItems(updatedCart.cart.items || []); 
  
    
     
  
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [setCartItems, ]); 

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const updatedCart = await response.json();
      setCartItems(updatedCart.items || []);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      const response = await fetch('/api/cart', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart, totalItems  }}>
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
