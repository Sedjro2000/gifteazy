'use client'
import React, { useState } from 'react';
import { useLists } from '../../context/ListsContext';
import { FaShareAlt, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import CreateListModal from '@/components/CreateListModal';
import ListViewModal from '@/components/ListViewModal';
import ShareModal from '@/components/ShareModal';

const demoProducts = [
  { id: 1, name: 'Produit A', price: 29.99, description: 'Description du produit A' },
  { id: 2, name: 'Produit B', price: 49.99, description: 'Description du produit B' },
  { id: 3, name: 'Produit C', price: 19.99, description: 'Description du produit C' },
  { id: 1, name: 'Produit A', price: 29.99, description: 'Description du produit A' },
  { id: 2, name: 'Produit B', price: 49.99, description: 'Description du produit B' },
  { id: 3, name: 'Produit C', price: 19.99, description: 'Description du produit C' },
  { id: 3, name: 'Produit C', price: 19.99, description: 'Description du produit C' },
];

const ListsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListViewModalOpen, setIsListViewModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [listToShare, setListToShare] = useState<string | null>(null);
  const { lists, addList, deleteList } = useLists();

  const handleCreateList = (listName: string) => {
    addList(listName);
  };

  const handleDeleteList = (listId: string) => {
    deleteList(listId);
  };

  const handleShareList = (listName: string) => {
    setListToShare(listName);
    setIsShareModalOpen(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleViewList = (list: any) => {
    // Ajouter les produits fictifs à la liste pour la démonstration
    const listWithItems = {
      ...list,
      items: demoProducts,
    };
    setSelectedList(listWithItems);
    setIsListViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Mes Listes de Cadeaux</h2>
          <div className="flex hidden md:block">
            <button
              onClick={openModal}
              className="bg-gray-800 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200"
            >
              + Nouvelle Liste
            </button>
          </div>
        </div>

        {lists.length === 0 ? (
          <p className="text-center text-gray-500">Aucune liste trouvée. Créez-en une pour commencer.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lists.map((list, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{list.name}</h3>
                    <p className="text-sm text-gray-500">Total Items: {demoProducts.length}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <button
                      onClick={() => handleViewList(list)}
                      className="text-gray-700 hover:text-gray-500 flex items-center space-x-2"
                    >
                      <FaEye size={20} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="text-red-500 hover:text-red-400 flex items-center space-x-2"
                    >
                      <FaTrash size={20} />
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => handleShareList(list.name)}
                      className="text-gray-700 hover:text-gray-500 flex items-center space-x-2"
                    >
                      <FaShareAlt size={20} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition duration-200"
      >
        <FaPlus size={24} />
      </button>

      <CreateListModal isOpen={isModalOpen} onClose={closeModal} onCreate={handleCreateList} />

      {/* Modal de visualisation de la liste */}
      {selectedList && (
        <ListViewModal
          isOpen={isListViewModalOpen}
          list={selectedList}
          onClose={() => setIsListViewModalOpen(false)}
        />
      )}

      {/* Modal de partage */}
      <ShareModal
        listName={listToShare || ''}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default ListsPage;
