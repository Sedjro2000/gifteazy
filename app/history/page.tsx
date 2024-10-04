'use client';
import React from 'react';
import { FaClock, FaTruck, FaCheckCircle, FaTimesCircle, FaGift } from 'react-icons/fa';
import Image from 'next/image';

interface Order {
  id: string;
  itemName: string;
  itemImage: string;
  orderDate: string;
  estimatedDelivery: string;
  status: 'En préparation' | 'Expédié' | 'Livré' | 'Annulé';
  totalAmount: string;
}

const userOrderHistory: Order[] = [
  {
    id: '001',
    itemName: 'Montre en bois',
    itemImage: '/images/wood-watch.jpg', // Remplacez par vos propres images
    orderDate: '01 Octobre 2024',
    estimatedDelivery: '10 Octobre 2024',
    status: 'Expédié',
    totalAmount: '120€',
  },
  {
    id: '002',
    itemName: 'Bouquet de fleurs',
    itemImage: '/images/flowers.jpg',
    orderDate: '15 Septembre 2024',
    estimatedDelivery: '20 Septembre 2024',
    status: 'Livré',
    totalAmount: '50€',
  },
  {
    id: '003',
    itemName: 'T-shirt personnalisé',
    itemImage: '/images/tshirt.jpg',
    orderDate: '05 Août 2024',
    estimatedDelivery: '10 Août 2024',
    status: 'Annulé',
    totalAmount: '25€',
  },
];

const OrderHistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold mb-6">Mon Historique de Commandes</h1>
      <div className="space-y-6">
        {userOrderHistory.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <div className="w-24 h-24 relative">
              <Image src={order.itemImage} alt={order.itemName} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{order.itemName}</h2>
              <p className="text-gray-600">Commande passée le : {order.orderDate}</p>
              {order.status === 'Expédié' && <p className="text-gray-600">Livraison prévue : {order.estimatedDelivery}</p>}
              {order.status === 'Livré' && <p className="text-green-600">Livré le : {order.estimatedDelivery}</p>}
              {order.status === 'Annulé' && <p className="text-red-600">Commande annulée</p>}
              <p className="mt-2 text-gray-800 font-semibold">Montant total : {order.totalAmount}</p>
            </div>
            <div className="flex items-center space-x-2">
              {order.status === 'En préparation' && (
                <FaClock className="text-yellow-500" size={32} title="En préparation" />
              )}
              {order.status === 'Expédié' && (
                <FaTruck className="text-blue-500" size={32} title="Expédié" />
              )}
              {order.status === 'Livré' && (
                <FaCheckCircle className="text-green-500" size={32} title="Livré" />
              )}
              {order.status === 'Annulé' && (
                <FaTimesCircle className="text-red-500" size={32} title="Annulé" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
