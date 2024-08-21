'use client'

'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

type Item = {
  name: string;
  price: string;
  image: string;
};

const thematicCategories = [
  'Birthdays',
  'Valentine\'s Day',
  'New Year\'s Eve',
  'Christmas',
  'Weddings',
];

const items: Item[] = [
  { name: 'Gift Box', price: '$50', image: '/item0.jpg' },
  { name: 'Valentine\'s Roses', price: '$30', image: '/item1.jpg' },
  { name: 'New Year Fireworks', price: '$100', image: '/item1.jpg' },
  { name: 'Christmas Tree', price: '$70', image: '/item0.jpg' },
  { name: 'Wedding Ring', price: '$500', image: '/ring.png' },
  { name: 'New Year Fireworks', price: '$100', image: '/item1.jpg' },
  { name: 'Christmas Tree', price: '$70', image: '/item0.jpg' },
  { name: 'Wedding Ring', price: '$500', image: '/ring.png' },
];

const Items: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const router = useRouter();

  const isMobile = () => window.innerWidth <= 768;

  const handleItemClick = (item: Item) => {
    console.log('Item clicked:', item);
    if (isMobile()) {
      router.push(`/product/${item.name}`);
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    console.log('Modal closed');
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="p-8  max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Get inspired</h2>
      <div className="flex space-x-4 mb-6">
        {thematicCategories.map((category, index) => (
          <button
            key={index}
            className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-lg ">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <button 
                  onClick={() => handleItemClick(item)} 
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </div>
  );
};

export default Items;
