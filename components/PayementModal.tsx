import React, { useState } from 'react';
import { FaTimes, FaCreditCard, FaMobileAlt } from 'react-icons/fa';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  offered: boolean;
}

interface PaymentModalProps {
  item: Item;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ item, onClose, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [address, setAddress] = useState<string>('123 Rue de Paris, 75001 Paris');
  const [deliveryCost, setDeliveryCost] = useState<number>(15.00);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto lg:max-w-5xl lg:h-auto lg:overflow-visible max-h-[90vh] lg:max-h-full overflow-y-auto">
        <div className="flex justify-between items-center border-b px-4 py-2 sticky top-0 bg-white lg:relative">
          <h2 className="text-xl font-semibold text-gray-800">Confirmer l'achat</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-4 lg:flex lg:space-x-6">
          {/* Section de paiement et adresse */}
          <div className="lg:w-2/3">
            <h3 className="text-lg font-semibold mb-4">Payment</h3>
            <div className="flex mb-4">
              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`flex-1 flex items-center justify-center p-3 border rounded-lg mr-2 ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-white' : 'border-gray-300'
                }`}
              >
                <FaCreditCard size={24} className="mr-2" />
                <span>Carte Bancaire</span>
              </button>
              <button
                onClick={() => handlePaymentMethodChange('momo')}
                className={`flex-1 flex items-center justify-center p-3 border rounded-lg ${
                  paymentMethod === 'momo' ? 'border-blue-500 bg-white' : 'border-gray-300'
                }`}
              >
                <FaMobileAlt size={24} className="mr-2" />
                <span>MTN MOMO</span>
              </button>
            </div>

            {/* Formulaire de paiement par carte */}
            {paymentMethod === 'card' && (
              <div>
                <input
                  type="text"
                  placeholder="Numéro de carte"
                  className="w-full mb-3 p-2 border rounded-lg"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Date d'expiration"
                    className="w-1/2 mb-3 p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 mb-3 p-2 border rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Nom complet"
                  className="w-full mb-3 p-2 border rounded-lg"
                />
              </div>
            )}

            {/* Formulaire de paiement par MTN MOMO */}
            {paymentMethod === 'momo' && (
              <div>
                <input
                  type="text"
                  placeholder="Numéro de téléphone MOMO"
                  className="w-full mb-3 p-2 border rounded-lg"
                />
              </div>
            )}

            <h3 className="text-lg font-semibold mt-6 mb-4">Adresse de livraison</h3>
            <input
              type="text"
              placeholder="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mb-3 p-2 border rounded-lg"
            />
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ville"
                className="w-1/2 mb-3 p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Code postal"
                className="w-1/2 mb-3 p-2 border rounded-lg"
              />
            </div>
            <input
              type="text"
              placeholder="Pays"
              className="w-full mb-3 p-2 border rounded-lg"
            />
          </div>

          {/* Section récapitulatif de la commande */}
          <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg mt-6 lg:mt-0">
            <h3 className="text-lg font-semibold mb-4">Résumé de la commande</h3>
            <div className="flex mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="text-gray-700">
                <h4 className="text-sm font-semibold">{item.name}</h4>
                <p className="text-sm">{item.description}</p>
                <p className="text-sm font-semibold mt-2">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Order:</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Livraison:</span>
                <span>${deliveryCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-gray-800 mt-2">
                <span>Total:</span>
                <span>${(item.price + deliveryCost).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onConfirm}
              className="mt-4 bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Confirmer et payer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
