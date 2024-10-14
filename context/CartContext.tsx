'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void; 
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data: session } = useSession();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  /*/ Charger le panier depuis l'API au démarrage
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
        console.log('Cart items loaded from API:', data.items); // Log des articles du panier récupérés
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, [session]); // Ajout de `session` dans la dépendance pour s'assurer que ça recharge si la session change
  useEffect(() => {
    const fetchCart = async () => {
        try {
            const response = await fetch('/api/cart');
            if (response.ok) {
                const data = await response.json();
                setCartItems(data.items); // Mettre à jour les articles du panier dans le contexte
            } else {
                console.error('Failed to load cart:', response.status);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    fetchCart();
}, [setCartItems]); */


useEffect(() => {
  const loadCart = async () => {
    console.log(session ? 'Session active, loading cart...' : 'No session, loading cart...');

    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        console.log('Cart items loaded:', data.items);
        setCartItems(data.items || []);
      } else {
        console.error('Failed to load cart:', response.status);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };
  loadCart();
}, [session, setCartItems]);  // Combined into one effect


  // Ajouter un article au panier
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

    // Mise à jour de l'état local directement après ajout
    /*setCartItems(prevItems => [...prevItems, item]); // Ajoute l'article localement sans refetch*/
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.productId === item.productId);
      if (existingItem) {
        // Mise à jour de la quantité
        return prevItems.map(i => 
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // Ajouter comme nouveau produit
        return [...prevItems, item];
      }
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}, [setCartItems]);

// Supprimer un article du panier
const removeFromCart = useCallback(async (productId: string) => {
  console.log('Removing from cart:', productId);
  try {
    const response = await fetch('/api/cart/item', {
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
    console.log('Updated cart after removing item:', updatedCart);

    // Mise à jour de l'état local après suppression
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId)); // Filtre localement sans refetch
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
}, [setCartItems]);

// Mettre à jour la quantité d'un article
const updateQuantity = useCallback(async (productId: string, newQuantity: number) => {


  if (!productId) {
    console.error("Product ID is undefined, cannot update quantity.");
    return;
  }

  console.log('Updating quantity for:', productId, 'New quantity:', newQuantity);
  try {
    const response = await fetch('/api/cart', {
      method: 'PATCH',  // PATCH pour mise à jour partielle
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity: newQuantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to update item quantity');
    }

    const updatedCart = await response.json();
    console.log('Updated cart after updating quantity:', updatedCart);

    // Mise à jour de l'état local après la mise à jour de la quantité
    setCartItems(prevItems => prevItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    ));
  } catch (error) {
    console.error('Error updating item quantity:', error);
  }
}, [setCartItems]);

// Vider le panier
const clearCart = useCallback(async () => {
  console.log('Clearing cart...');
  try {
    const response = await fetch('/api/cart', { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    console.log('Cart cleared successfully');

    // Mise à jour de l'état local pour vider le panier
    setCartItems([]); // Vide localement sans refetch
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
}, []);


  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export type { CartItem };

