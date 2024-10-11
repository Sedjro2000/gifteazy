'use client'
import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext'; 
import Image from 'next/image';
import { calculateTotalPrice } from '@/utils/calculateTotalPrice';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cartItems,  removeFromCart, totalItems, updateQuantity } = useCart();
const router = useRouter()

   // Fonction pour gérer la validation de la commande
   const handleOrder = async () => {

    const orderAmount = parseFloat(totalPrice);

    if (isNaN(orderAmount)) {
      console.error('Invalid total price');
      return; // Empêche l'envoi de la commande si le prix total est invalide
    }
  
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          amount: orderAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Rediriger vers la page de commande après création
        // Vider le panier après la commande
        router.push(`/order/${data.id}`); // Rediriger vers la page de la commande
      } else {
        console.error('Order creation failed:', data.error);
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const handleQuantityChange = (item: any, quantityChange: number) => {
    const newQuantity = item.quantity + quantityChange;
  
    console.log('Changing quantity for item:', item.productId, 'New Quantity:', newQuantity);
  
    if (newQuantity <= 0) {
      console.log('Removing item from cart:', item.productId);
      removeFromCart(item.productId);  // Supprimer l'article si la quantité est 0 ou moins
    } else {
      console.log('Updating quantity in cart for item:', item.productId, 'New Quantity:', newQuantity);
      updateQuantity(item.productId, newQuantity);  // Mettre à jour la quantité
    }
  };
  

  const handleRemove = (productId: string) => {
    console.log('Removing item with productId:', productId);
    removeFromCart(productId);
  };
  const totalPrice = calculateTotalPrice(cartItems);

 /* const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0).toFixed(2);*/

  
  useEffect(() => {
    console.log('Cart Items:', cartItems); // Log des articles dans le panier pour vérification
    console.log('Total Price:', totalPrice); // Log du prix total
  }, [cartItems, totalPrice]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-4">
    <div className="max-w-6xl w-full mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mon Panier 🛒</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 ">
        {/* Left: Product List */}
        <div className="bg-white shadow-md rounded-lg p-6 lg:w-2/3 space-y-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Produits: {totalItems}</h2>
          
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border-b">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="flex-1 flex justify-between gap-4 flex-col">
                  <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Price: {item.product.price} CFA</p>
                </div>
                <div className="flex items-center ">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="bg-gray-200 p-2 rounded-l-md"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="bg-gray-200 p-2 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-medium">{(item.quantity * parseFloat(item.product.price)).toFixed(2)} CFA</p>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Votre panier est vide.</p>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-1/3 space-y-6 flex flex-col">
          {/* Calculated Shipping
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Calculer la Livraison</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Pays"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Ville"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Code Postal"
                className="w-full p-2 border rounded-md"
              />
              <button className="w-full bg-gray-800 text-white rounded-md p-2 mt-4">
                Mettre à jour
              </button>
            </div>
          </div> */}

          {/* Coupon Code */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Code Promo</h2>
            <input
              type="text"
              placeholder="Entrez le code promo"
              className="w-full p-2 border rounded-md"
            />
            <button className="w-full bg-gray-800 text-white rounded-md p-2 mt-4">
              Appliquer
            </button>
          </div>

          {/* Cart Total */}
          <div className="bg-yellow-100 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Total du Panier</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{totalPrice} CFA</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuit</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{totalPrice} CFA</span>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md p-3 mt-4" onClick={handleOrder}>
                Valider la commande
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer-like information section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <span className="bg-pink-100 p-2 rounded-full">🚚</span>
          <p>Livraison Gratuite dès 50000 CFA d'achat</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <span className="bg-yellow-100 p-2 rounded-full">📞</span>
          <p>Appelez-nous au +34 555 5555</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <span className="bg-green-100 p-2 rounded-full">💬</span>
          <p>Assistance 24h/24 et 7j/7</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
          <span className="bg-blue-100 p-2 rounded-full">🎁</span>
          <p>Emballages cadeaux disponibles</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartPage;
