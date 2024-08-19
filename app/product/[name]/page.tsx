'use client'
import { useParams } from 'next/navigation';
import React from 'react';
import { useCart } from 'react-use-cart';

interface Item {
  name: string;
  price: string;
  image: string;
  description?: string;
  articleNumber?: string;
}

const fetchItemDetails = (name: string): Item | null => {
  const items = [
    { name: 'Gift Box', price: '$50', image: '/item0.jpg', description: 'A beautiful gift box for special occasions.', articleNumber: '903.031.06' },
    { name: 'Valentine\'s Roses', price: '$30', image: '/item1.jpg', description: 'Romantic roses for Valentine\'s Day.', articleNumber: '903.031.07' },
    { name: 'New Year Fireworks', price: '$100', image: '/item1.jpg', description: 'Celebratory fireworks for New Year.', articleNumber: '903.031.08' },
    { name: 'Christmas Tree', price: '$70', image: '/item0.jpg', description: 'A festive Christmas tree.', articleNumber: '903.031.09' },
    { name: 'Wedding Ring', price: '$500', image: '/item0.jpg', description: 'Elegant wedding ring.', articleNumber: '903.031.10' },
  ];

  const item = items.find(item => item.name === name);
  return item || null;
};

const ProductDetailsMobile: React.FC = () => {
  const params = useParams();
  const { addItem } = useCart();  // Utilisation de useCart pour gérer l'ajout au panier
  const name = Array.isArray(params.name) ? decodeURIComponent(params.name[0]) : decodeURIComponent(params.name || 'Default Item Name');

  const item = fetchItemDetails(name);

  if (!item) {
    return <div>Item not found</div>;
  }

  // Fonction pour ajouter l'article au panier
  const handleAddToCart = () => {
    addItem({
      id: item.name,
      name: item.name,
      price: parseFloat(item.price.replace('$', '')),
      image: item.image,
    });
  };

  return (
    <div className="p-4 sm:p-8">
      <img src={item.image} alt={item.name} className="w-full h-60 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{item.name}</h1>
      <p className="text-xl text-gray-800 mt-2">{item.price}</p>
      <p className="text-gray-600 mt-4">{item.description}</p>
      {item.articleNumber && (
        <p className="text-gray-500 mt-2">Article Number: {item.articleNumber}</p>
      )}
      <button
        onClick={handleAddToCart}
        className="bg-yellow-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
      >
        Add to list ({item.price})
      </button>
    </div>
  );
};

export default ProductDetailsMobile;
