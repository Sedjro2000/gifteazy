'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLists } from '../../context/ListsContext';

const ListsPage: React.FC = () => {
  const [newListName, setNewListName] = useState('');
  const { lists, addList } = useLists();
  const router = useRouter();

  const handleCreateList = () => {
    if (newListName.trim()) {
      addList(newListName.trim());
      console.log('New list created:', newListName);
      console.log('Current lists state:', lists);
      setNewListName('');
    }
  };

  const handleViewList = (listName: string) => {
    router.push(`/list/${listName}`);
    console.log('Viewing list:', listName);
  };

  const handleDeleteList = (listName: string) => {
    // Add delete logic here
    console.log(`List "${listName}" deleted`);
    // For demonstration, log the current lists state
    console.log('Current lists state:', lists);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Lists</h2>
        <div className="mb-6 flex">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter new list name"
            className="flex-grow border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-all duration-300 p-2 text-lg"
          />
          <button
            onClick={handleCreateList}
            className="ml-4 bg-gradient-to-r from-teal-400 to-indigo-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Create List
          </button>
        </div>
        {lists.length === 0 ? (
          <p className="text-center text-gray-500">No lists found. Create one to get started.</p>
        ) : (
          <ul>
            {lists.map((list, index) => (
              <li key={index} className="mb-6">
                <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold text-gray-700">{list.name}</span>
                    <div>
                      <button
                        onClick={() => handleViewList(list.name)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 mr-2"
                      >
                        Voir
                      </button>
                      <button
                        onClick={() => handleDeleteList(list.name)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-4">
                    {list.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg shadow-md object-cover mr-4"
                        />
                        <div className="text-sm">
                          <div className="font-medium text-gray-800">{item.name}</div>
                          <div className="text-gray-600">{item.price}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListsPage;
