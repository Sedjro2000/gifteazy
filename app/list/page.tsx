'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLists } from '../../context/ListsContext';
import { FaShareAlt, FaTrash } from 'react-icons/fa';
import ShareModal from '../../components/ShareModal';

const ListsPage: React.FC = () => {
  const [newListName, setNewListName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListName, setSelectedListName] = useState('');
  const { lists, addList, deleteList, deleteItemFromList } = useLists();
  const router = useRouter();

  const handleCreateList = () => {
    if (newListName.trim()) {
      addList(newListName.trim());
      console.log('New list created:', newListName);
      console.log('Current lists state:', lists);
      setNewListName('');
    }
  };

  const handleDeleteList = (listId: string) => {
    console.log(`Request to delete list with id "${listId}"`);
    deleteList(listId);
    console.log('Current lists state after deletion:', lists);
  };

  const handleDeleteItem = (listId: string, itemId: string | undefined) => {
    if (itemId) {
      console.log(`Request to delete item with id "${itemId}" from list "${listId}"`);
      deleteItemFromList(listId, itemId);
      console.log('Current lists state after item deletion:', lists);
    } else {
      console.error(`Item id is undefined for list "${listId}". Cannot delete item.`);
    }
  };

  const handleShareList = (listName: string) => {
    setSelectedListName(listName);
    setIsModalOpen(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/test.jpg')` }}
    >
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Mes Listes</h2>
        <div className="mb-6 flex">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter new list name"
            className="flex-grow border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-all duration-300 p-2 text-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg text-gray-900"
          />
          <button
            onClick={handleCreateList}
            className="ml-4 bg-gradient-to-r from-teal-400 to-indigo-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Create List
          </button>
        </div>
        {lists.length === 0 ? (
          <p className="text-center text-gray-200">No lists found. Create one to get started.</p>
        ) : (
          <ul>
            {lists.map((list, index) => (
              <li key={index} className="mb-6">
                <div className="p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold text-white">{list.name}</span>
                    <div>
                      <button
                        onClick={() => handleShareList(list.name)}
                        className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <FaShareAlt className="inline-block mr-2" />
                        Partager
                      </button>
                      <button
                        onClick={() => handleDeleteList(list.id)}
                        className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ml-2"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-4">
                    {list.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-4 rounded-lg shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg shadow-md object-cover mr-4"
                        />
                        <div className="text-sm text-white">
                          <div className="font-medium">{item.name}</div>
                          <div>{item.price}</div>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(list.id, item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-300 ml-auto"
                        >
                          <FaTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ShareModal
        listName={selectedListName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ListsPage;
