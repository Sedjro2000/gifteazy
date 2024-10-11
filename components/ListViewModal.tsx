import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLists } from '@/context/ListsContext'; 

interface Product {
  id?: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface ListViewModalProps {
  isOpen: boolean;
  listId: string;
  listTitle: string;
  onClose: () => void;
}

const ListViewModal: React.FC<ListViewModalProps> = ({ isOpen, listId, listTitle, onClose }) => {
  const [items, setItems] = useState<Product[]>([]);
  const { getListItems } = useLists(); // Récupérer la méthode `getListItems` depuis le contexte
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchItems = async () => {
        setIsLoading(true);
        const fetchedItems = await getListItems(listId);
        setItems(fetchedItems || []);
        setIsLoading(false);
      };
      fetchItems();
    }
  }, [isOpen, listId, getListItems]);
  console.log("item trouvé ", items)
  console.log( items.length)

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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{listTitle}</h2>

        {isLoading ? (
          <p className="text-gray-700 dark:text-gray-400">Chargement des items...</p>
        ) : (
          <>
            <p className="mb-4 text-gray-700 dark:text-gray-400">Total Items: {items.length}</p>

            {/* Liste des produits */}
            {items.length === 0 ? (
              <p className="text-gray-500">Aucun produit trouvé.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      width={150}
                      height={150}
                      className="object-cover rounded-md mb-2"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{item.product.description}</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">{item.product.price}CFA</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Bouton de fermeture */}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-400 transition duration-200"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ListViewModal;
