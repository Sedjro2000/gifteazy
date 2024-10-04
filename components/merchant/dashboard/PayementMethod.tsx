'use client';
import React, { useState } from 'react';

interface PaymentMethod {
  id: number;
  type: string; // Either 'card' or 'mobile'
  cardNumber?: string;
  cardHolderName?: string;
  mobileNumber?: string;
  provider?: string;
  expiryDate?: string;
}

const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: 'card', cardNumber: '**** **** **** 1234', cardHolderName: 'John Doe', expiryDate: '12/25' },
  ]);
  const [paymentType, setPaymentType] = useState<'card' | 'mobile'>('card');

  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolderName, setNewCardHolderName] = useState('');
  const [newExpiryDate, setNewExpiryDate] = useState('');
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [newProvider, setNewProvider] = useState('');

  const handleAddPaymentMethod = () => {
    if (paymentType === 'card') {
      const newPaymentMethod = {
        id: paymentMethods.length + 1,
        type: 'card',
        cardNumber: `**** **** **** ${newCardNumber.slice(-4)}`,
        cardHolderName: newCardHolderName,
        expiryDate: newExpiryDate,
      };
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
    } else if (paymentType === 'mobile') {
      const newPaymentMethod = {
        id: paymentMethods.length + 1,
        type: 'mobile',
        mobileNumber: newMobileNumber,
        provider: newProvider,
      };
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
    }
    
    // Reset fields
    setNewCardNumber('');
    setNewCardHolderName('');
    setNewExpiryDate('');
    setNewMobileNumber('');
    setNewProvider('');
  };

  const handleDeletePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Méthodes de Paiement</h3>

      {/* List of Payment Methods */}
      <div className="mb-6">
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500">Aucune méthode de paiement enregistrée.</p>
        ) : (
          paymentMethods.map((method) => (
            <div key={method.id} className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-center">
                {method.type === 'card' ? (
                  <div>
                    <p className="text-lg font-semibold">{method.cardHolderName}</p>
                    <p className="text-gray-600">{method.cardNumber}</p>
                    <p className="text-gray-500 text-sm">Expire le {method.expiryDate}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold">{method.provider}</p>
                    <p className="text-gray-600">{method.mobileNumber}</p>
                  </div>
                )}
                <button
                  onClick={() => handleDeletePaymentMethod(method.id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment Type Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Type de méthode de paiement</label>
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value as 'card' | 'mobile')}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="card">Carte de Crédit/Débit</option>
          <option value="mobile">Paiement Mobile (MTN MOMO, MOOV Money)</option>
        </select>
      </div>

      {/* Add New Card or Mobile Payment */}
      {paymentType === 'card' ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Numéro de carte</label>
            <input
              type="text"
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Numéro de carte"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Nom du titulaire de la carte</label>
            <input
              type="text"
              value={newCardHolderName}
              onChange={(e) => setNewCardHolderName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Nom du titulaire"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date d'expiration</label>
            <input
              type="text"
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="MM/AA"
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Numéro de Téléphone</label>
            <input
              type="text"
              value={newMobileNumber}
              onChange={(e) => setNewMobileNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Numéro de téléphone mobile"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Fournisseur</label>
            <select
              value={newProvider}
              onChange={(e) => setNewProvider(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Sélectionner un fournisseur</option>
              <option value="MTN MOMO">MTN MOMO</option>
              <option value="MOOV Money">MOOV Money</option>
            </select>
          </div>
        </>
      )}

      <button
        onClick={handleAddPaymentMethod}
        className="bg-red-500 text-white py-2 px-6 rounded"
      >
        Ajouter la méthode de paiement
      </button>
    </div>
  );
};

export default PaymentMethods;
