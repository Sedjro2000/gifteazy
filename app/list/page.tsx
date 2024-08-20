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
  };

  console.log('Current lists:', lists);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Mes Listes</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Nom de la nouvelle liste"
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={handleCreateList}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Créer la liste
        </button>
      </div>
      {lists.length === 0 ? (
        <p>Aucune liste trouvée. Créez-en une nouvelle pour commencer.</p>
      ) : (
        <ul>
          {lists.map((list, index) => (
            <li key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{list.name}</span>
                <div>
                  <button
                    onClick={() => handleViewList(list.name)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => handleDeleteList(list.name)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <ul className="mt-2 pl-4">
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="border p-2 rounded-lg mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mb-2"
                    />
                    <div className="text-sm">
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListsPage;
