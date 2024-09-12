import React from 'react';
import { FaShareAlt, FaTrash } from 'react-icons/fa';

interface ListViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
}

const ListViewModal: React.FC<ListViewModalProps> = ({ isOpen, onClose, listName }) => {
  if (!isOpen) return null;

  // Données statiques pour la démo
  const items = [
    {
      id: 1,
      name: 'Montre Luxe',
      price: 150.99,
      quantity: 1,
      imageUrl: 'cadeau-2.jpg',
    },
    {
      id: 2,
      name: 'Sac en cuir',
      price: 200.0,
      quantity: 1,
      imageUrl: 'cadeau-1.jpg',
    },
    {
      id: 3,
      name: 'Sneakers',
      price: 120.5,
      quantity: 2,
      imageUrl: 'bouquet.png',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{listName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            X {/* Bouton de fermeture */}
          </button>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                  <p className="text-md font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-600">
                <FaTrash size={20} />
              </button>
            </div>
          ))}
        </div>
    <div className='flex justify-between mt-8'>
    <button
            
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            <FaShareAlt size={16} className="mr-2" />
            Partager la Liste
          </button>
        <button
          onClick={onClose}
          className=" bg-gray-500 text-white px-4  rounded-lg shadow-lg hover:bg-red-500 transition duration-200"
        >
          Fermer
        </button>
    </div>
      </div>
    </div>
  );
};

export default ListViewModal;
