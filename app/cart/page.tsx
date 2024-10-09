'use client'
import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext'; // Assurez-vous que ce chemin est correct
import Image from 'next/image';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, totalItems, setCartItems } = useCart();

  const handleQuantityChange = (item: any, quantityChange: number) => {
    const newQuantity = item.quantity + quantityChange;
    
    console.log('Changing quantity for item:', item.name, 'New Quantity:', newQuantity);

    if (newQuantity <= 0) {
      console.log('Removing item from cart:', item.name);
      removeFromCart(item.productId);
    } else {
      console.log('Updating quantity in cart for item:', item.name, 'New Quantity:', newQuantity);
      addToCart({ ...item, quantity: newQuantity });
    }
  };

  const handleRemove = (productId: string) => {
    console.log('Removing item with productId:', productId);
    removeFromCart(productId);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0).toFixed(2);
  useEffect(() => {
    console.log('Cart Items:', cartItems); // Log des articles dans le panier pour vérification
    console.log('Total Price:', totalPrice); // Log du prix total
  }, [cartItems, totalPrice]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center ">
      <div className=" max-w-screen-2xl mx-auto p-4  ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Mon Panier 🛒
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-8 ">
          {/* Gauche: Liste des produits */}
          <div className="w-full md:w-2/3">
            <h2 className="text-lg font-semibold mb-4">nbre de produits au total: {totalItems}</h2>
            <div className="space-y-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center gap-6">
                    <div className="flex items-center">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="text-white bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-l-md"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          className="text-white bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-r-md"
                        >
                          +
                        </button>
                        <span className="font-medium text-gray-800">{item.product.price} CFA</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Votre panier est vide.</p>
              )}
            </div>
          </div>

          {/* Droite: Résumé de commande */}
          <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>

            {/* Total et Coupon */}
            <div className="space-y-4">
              <div className="flex justify-between text-gray-800">
                <span>Sous-total</span>
                <span className="font-medium">{totalPrice}€</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <span>Livraison</span>
                <span className="font-medium">Gratuit</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>{totalPrice}€</span>
              </div>

              <div className="mt-6">
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-600 mb-2">
                  Code promo
                </label>
                <input
                  id="coupon"
                  type="text"
                  placeholder="Entrez le code promo"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button className="w-full bg-gray-800 text-white rounded-md p-2 mt-4 hover:bg-gray-700">
                  Appliquer
                </button>
              </div>
            </div>

            {/* Bouton Checkout */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md p-3 mt-6 text-lg font-semibold hover:opacity-90">
              Valider la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
