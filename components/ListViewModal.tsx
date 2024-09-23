import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string
}

interface ListViewModalProps {
  isOpen: boolean;
  list: { name: string; items: Product[] };
  onClose: () => void;
}

const ListViewModal: React.FC<ListViewModalProps> = ({ isOpen, list, onClose }) => {
  console.log("contenu de la liste", list.items)
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.0 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 backdrop-blur-lg backdrop-opacity-30 bg-opacity-40 shadow-xl border border-gray-300 dark:border-gray-700 rounded-lg p-6 w-full max-w-4xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
      >
        {/* Titre de la liste */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{list.name}</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-400">Total Items: {list.items.length}</p>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.items.map((item) => (
            <div
              key={item.id}
              className="bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.name}</h3>
           
              <p className="mt-2 text-blue-600 dark:text-blue-400 font-semibold">${item.price}</p>
              <Image  src={item.image} alt='item' width={50} height={50}/>
            </div>
          ))}
        </div>

        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition duration-200"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ListViewModal;
