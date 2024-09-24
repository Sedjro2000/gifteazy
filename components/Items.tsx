'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 
import Modal from './Modal';

type Item = {
  name: string;
  price: string;
  image: string;
  category: string;
};

const thematicCategories = [
  'All',
  'Birthdays',
  'Valentine\'s Day',
  'New Year\'s Eve',
  'Christmas',
  'Weddings',
];


const items: Item[] = [
  { name: 'Gift Box', price: '$50', image: '/item0.jpg', category: 'Birthdays' },
  { name: 'Valentine\'s Roses', price: '$30', image: '/item1.jpg', category: 'Valentine\'s Day' },
  { name: 'Birthday Cake', price: '$30', image: '/item2.jpg', category: 'Birthdays' },
  { name: 'Bmw', price: '$20', image: '/item3.png', category: 'Valentine\'s Day' },
  { name: 'Mèche Brésilienne', price: '$100', image: '/item4.png', category: 'New Year\'s Eve' },
  { name: 'Valentine Chocolate', price: '$150', image: '/item5.png', category: 'Christmas' },
  { name: 'Wedding Ring', price: '$500', image: '/wedding.jpg', category: 'Weddings' },
  { name: 'Santa Hat', price: '$10', image: 'xmas.jpg', category: 'Christmas' },
  { name: 'Vin ', price: '$50', image: '/wine.png', category: 'Christmas' },
  { name: 'Cake', price: '$2000', image: '/cake.jpg', category: 'Weddings' },
  { name: 'Party Poppers', price: '$5', image: '/item11.jpg', category: 'New Year\'s Eve' },
  { name: 'Party Hats', price: '$5', image: '/item12.jpg', category: 'Birthdays' },
  { name: 'Balloons', price: '$8', image: '/item13.jpg', category: 'Birthdays' },
  { name: 'Valentine\'s Card', price: '$5', image: '/item14.jpg', category: 'Valentine\'s Day' },
  { name: 'Birthday Candles', price: '$10', image: '/item15.jpg', category: 'Birthdays' },
  { name: 'Christmas Ornaments', price: '$30', image: '/item16.jpg', category: 'Christmas' },
  { name: 'Wedding Cake', price: '$300', image: '/item17.jpg', category: 'Weddings' },
  { name: 'Birthday Invitation', price: '$20', image: '/item18.jpg', category: 'Birthdays' },
  { name: 'Valentine\'s Necklace', price: '$100', image: '/item19.jpg', category: 'Valentine\'s Day' },
  { name: 'Fireworks', price: '$200', image: '/item20.jpg', category: 'New Year\'s Eve' },
  { name: 'Wedding Bouquet', price: '$200', image: '/item21.jpg', category: 'Weddings' },
  { name: 'Christmas Stocking', price: '$25', image: '/item22.jpg', category: 'Christmas' },
  { name: 'Party Streamers', price: '$5', image: '/item23.jpg', category: 'New Year\'s Eve' },
  { name: 'Wedding Invitation', price: '$50', image: '/item24.jpg', category: 'Weddings' },
  { name: 'Christmas Cookies', price: '$15', image: '/item25.jpg', category: 'Christmas' },
  { name: 'Valentine\'s Gift', price: '$50', image: '/item26.jpg', category: 'Valentine\'s Day' },
  { name: 'New Year\'s Eve Dress', price: '$150', image: '/item27.jpg', category: 'New Year\'s Eve' },
  { name: 'Santa Suit', price: '$100', image: '/item28.jpg', category: 'Christmas' },
  { name: 'Birthday Pinata', price: '$30', image: '/item29.jpg', category: 'Birthdays' },
  { name: 'Wedding Veil', price: '$150', image: '/item30.jpg', category: 'Weddings' },
];

const Items: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Get inspired</h2>
      <div className="flex space-x-4 mb-6">
        {thematicCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 ${
              selectedCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full h-48">
              <Image 
                src={item.image} 
                alt={item.name} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg" 
              />
            </div>
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
