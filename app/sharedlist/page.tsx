'use client';
import React, { useState } from 'react';
import { FaGift } from 'react-icons/fa';
import PaymentModal from '@/components/PayementModal'; // Assurez-vous d'importer le modal ici

const SharedListPage = () => {
  const listType = 'C\'est mon Anniversaire';
  const listOwner = 'Jean Dupont';
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Casque sans fil',
      description: 'Casque antibruit de haute qualité.',
      price: 299.99,
      image: '/gift1.jpg',
      offered: false,
    },
    {
      id: 2,
      name: 'Montre connectée',
      description: 'Montre élégante avec fonctionnalités fitness.',
      price: 199.99,
      image: '/gift0.jpg',
      offered: false,
    },
    {
      id: 3,
      name: 'Enceinte Bluetooth',
      description: 'Enceinte portable avec une excellente qualité sonore.',
      price: 99.99,
      image: '/cake.jpg',
      offered: true,
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOffer = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true); // Ouvrir le modal
  };

  const confirmOffer = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, offered: true } : item
    ));
    setIsModalOpen(false); // Fermer le modal après confirmation
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-primary-500 py-6 px-4 text-center shadow-md">
        <h1 className="text-3xl font-semibold">{listType} - {listOwner}</h1>
        <p className="text-md mt-2">Liste de cadeaux</p>
      </header>

      {/* Liste des Articles */}
      <main className="w-full max-w-5xl py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ${item.offered ? 'opacity-50' : ''}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-500">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    {item.offered ? (
                      <span className="text-sm text-red-500 font-semibold">
                        Déjà offert
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOffer(item)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600 transition duration-200 ease-in-out"
                      >
                        <FaGift />
                        <span>Offrir</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal pour le paiement et la livraison */}
      {isModalOpen && selectedItem && (
        <PaymentModal 
          item={selectedItem} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={() => confirmOffer(selectedItem.id)} 
        />
      )}
    </div>
  );
};

export default SharedListPage;
