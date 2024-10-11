import React from 'react';

const OrderConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-10">
        {/* Colonne gauche : Détails de la commande */}
        <div className="flex-1">
          <button className="text-gray-600 mb-6 flex items-center space-x-2">
            <span>←</span> <span>Retour au panier</span>
          </button>
          
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informations sur la commande</h2>
          <p className="text-sm text-gray-500 mb-6">
            En validant votre commande, vous acceptez nos <span className="text-blue-500">Conditions</span> et <span className="text-blue-500">Politique de confidentialité</span>.
          </p>
          
          {/* Liste des produits */}
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center bg-gray-100 p-5 rounded-lg">
                <img
                  src="/path/to/image.jpg" // Remplacer par le chemin de l'image
                  alt="Product"
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-medium text-gray-800">Produit {item}</h3>
                  <p className="text-sm text-gray-500">Description courte du produit</p>
                  <span className="text-gray-700">Quantité: 1</span>
                </div>
                <div className="text-gray-800 font-bold">20,00 €</div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite : Détails du paiement */}
        <div className="flex-1 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Détails du paiement</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-2">Adresse e-mail</label>
              <input 
                type="email" 
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" 
                placeholder="votre.email@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Adresse de livraison</label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" 
                placeholder="Votre adresse complète"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Méthode de paiement</label>
              <div className="flex space-x-4">
                <button className="w-1/2 p-3 border rounded-md focus:ring focus:ring-blue-300 bg-white">
                  Kikiapay
                </button>
                <button className="w-1/2 p-3 border rounded-md focus:ring focus:ring-blue-300 bg-white">
                  Feda Pay
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="flex justify-between text-gray-700">
              <span>Sous-total</span>
              <span>40,00 €</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Livraison</span>
              <span>4,99 €</span>
            </div>
            <div className="border-t border-gray-300 mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>44,99 €</span>
              </div>
            </div>
          </div>

          <button className="mt-8 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
            Payer 44,99 €
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
