'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Item {
  name: string;
  price: string;
  image: string;
}

interface List {
  id: string;
  name: string;
  items: Item[];
}

const SharedListPage: React.FC = () => {
  const [list, setList] = useState<List | null>(null);
  const { listId } = useParams(); // Capture the list ID from the URL

  useEffect(() => {
    // Fetch the list from localStorage based on the list ID
    const lists = JSON.parse(localStorage.getItem('lists') ?? '[]');
    const sharedList = lists.find((l: List) => l.id === listId);

    if (sharedList) {
      setList(sharedList);
    } else {
      console.log('List not found');
    }
  }, [listId]);

  if (!list) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{`List: ${list.name}`}</h2>
        <ul className="space-y-6">
          {list.items.map((item, index) => (
            <li key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg shadow-md object-cover mr-4"
              />
              <div>
                <div className="text-xl font-semibold text-gray-700">{item.name}</div>
                <div className="text-gray-600">{item.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SharedListPage;
