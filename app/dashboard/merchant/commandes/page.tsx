'use client'
import Image from 'next/image';
import { useState } from 'react';

interface Order {
  id: string;
  paymentStatus: 'Pending' | 'Success';
  fulfillment: 'Unfulfilled' | 'Fulfilled';
  customer: string;
  items: number;
  productImage: string;
}

const orders: Order[] = [
  {
    id: '#1002',
    paymentStatus: 'Pending',
    fulfillment: 'Unfulfilled',
    customer: 'Wade Warren',
    items: 2,
    productImage: '',
  },
  {
    id: '#1004',
    paymentStatus: 'Success',
    fulfillment: 'Fulfilled',
    customer: 'Esther Howard',
    items: 3,
    productImage: '',
  },
  {
    id: '#1007',
    paymentStatus: 'Pending',
    fulfillment: 'Unfulfilled',
    customer: 'Jenny Wilson',
    items: 1,
    productImage: '',
  },
];

const OrdersPage = () => {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Commandes</h1>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left p-4">Commande</th>
            <th className="text-left p-4">Statut Paiement</th>
            <th className="text-left p-4">Statut Livraison</th>
            <th className="text-left p-4">Client</th>
            <th className="text-left p-4">Articles</th>
            <th className="text-left p-4">Image Produit</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-4">{order.id}</td>
              <td className="p-4">
                <span
                  className={`py-1 px-3 rounded-full text-white ${
                    order.paymentStatus === 'Success' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`py-1 px-3 rounded-full text-white ${
                    order.fulfillment === 'Fulfilled' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {order.fulfillment}
                </span>
              </td>
              <td className="p-4">{order.customer}</td>
              <td className="p-4">{order.items}</td>
              <td className="p-4">
                <Image
                  src={order.productImage}
                  alt="Image produit"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
