'use client';
import React, { useState } from 'react';
import { useLists } from '../../context/ListsContext';
import { FaShareAlt, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import CreateListModal from '@/components/CreateListModal';
import ListViewModal from '@/components/ListViewModal';
import ShareModal from '@/components/ShareModal';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

const ListsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isListViewModalOpen, setIsListViewModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [listToDelete, setListToDelete] = useState<string | null>(null);
  const [listToShare, setListToShare] = useState<string | null>(null);
  const { lists, addList, deleteList } = useLists();

  const openDeleteModal = (listId: string) => {
    setListToDelete(listId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (listToDelete) {
      await deleteList(listToDelete);
      setListToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setListToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleCreateList = (listName: string) => {
    addList(listName);
  };

  const handleShareList = (listName: string) => {
    setListToShare(listName);
    setIsShareModalOpen(true);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleView = (list: any) => {
    setSelectedList(list);
    setIsListViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Mes Listes de Cadeaux</h2>
          <div className="flex hidden md:block">
            <button
              onClick={openCreateModal}
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{list.title}</h3>
                    <p className="text-sm text-gray-500">Total Items: {list.items ? list.items.length : 0}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <button
                      onClick={() => handleView(list)}
                      className="text-gray-700 hover:text-gray-500 flex items-center space-x-2"
                    >
                      <FaEye size={20} />
                      <span>Voir</span>
                    </button>
                    <button
                      onClick={() => openDeleteModal(list.id)}
                      className="text-red-500 hover:text-red-400 flex items-center space-x-2"
                    >
                      <FaTrash size={20} />
                      <span>Supprimer</span>
                    </button>
                    <button
                      onClick={() => handleShareList(list.title)}
                      className="text-gray-700 hover:text-gray-500 flex items-center space-x-2"
                    >
                      <FaShareAlt size={20} />
                      <span>Partager</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={openCreateModal}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition duration-200"
      >
        <FaPlus size={24} />
      </button>

      {/* Modal de création */}
      <CreateListModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onCreate={handleCreateList} />

      {/* Modal de visualisation de liste */}
      {selectedList && (
        <ListViewModal
          isOpen={isListViewModalOpen}
          listId={selectedList.id}
          listTitle={selectedList.title}
          onClose={() => setIsListViewModalOpen(false)}
        />
      )}

      {/* Modal de partage */}
      <ShareModal
        listName={listToShare || ''}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Modal de confirmation de suppression */}
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Êtes-vous sûr de vouloir supprimer cette liste ?"
        confirmText="Confirmer"
        cancelText="Annuler"
      />
    </div>
  );
};

export default ListsPage;
