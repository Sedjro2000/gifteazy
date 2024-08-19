// app/GiftList.tsx
'use client';
import React from 'react';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/navigation';

const GiftList: React.FC = () => {
  const router = useRouter();
  const { items, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Gift List</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">Your gift list is currently empty.</p>
          <button 
            onClick={() => router.push('/items')}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Add Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GiftList;
