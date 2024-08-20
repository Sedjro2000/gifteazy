'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Item = {
  name: string;
  price: string;
  image: string;
};

type List = {
  id: string;
  name: string;
  items: Item[];
};

type ListContextType = {
  lists: List[];
  addList: (listName: string) => void;
  addItemToList: (listId: string, item: Item) => void; // Modifié pour utiliser listId
};

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<List[]>(() => {
    if (typeof window !== 'undefined') {
      const savedLists = localStorage.getItem('lists');
      console.log('Loaded lists from localStorage:', savedLists);
      return savedLists ? JSON.parse(savedLists) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lists', JSON.stringify(lists));
      console.log('Saved lists to localStorage:', lists);
    }
  }, [lists]);

  const addList = (name: string) => {
    setLists(prevLists => {
      const newList = {
        id: generateUniqueId(),
        name: name,
        items: [],
      };
      console.log('Added new list:', newList);
      return [...prevLists, newList];
    });
  };
  const addItemToList = (listId: string, item: { name: string; price: string; image: string }) => {
    setLists((prevLists) => {
      console.log('Previous lists:', prevLists);
  
      const updatedLists = prevLists.map((list) => {
        if (list.id === listId) {
          console.log('Found matching list:', list);
          // Ajoutez l'article à la liste correspondante
          return { ...list, items: [...list.items, item] };
        }
        return list;
      });
  
      console.log('Updated lists before saving to localStorage:', updatedLists);
  
      // Sauvegardez la liste mise à jour dans localStorage
      localStorage.setItem('lists', JSON.stringify(updatedLists));
      
      // Vérifiez ce qui est stocké dans localStorage après sauvegarde
      console.log('Data saved to localStorage:', localStorage.getItem('lists'));
  
      // Affichez les listes mises à jour dans localStorage
      console.log('Updated lists in localStorage:', JSON.parse(localStorage.getItem('lists') ?? '[]'));
  
      return updatedLists;
    });
  };
  
  
  
  const generateUniqueId = (): string => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <ListContext.Provider value={{ lists, addList, addItemToList }}>
      {children}
    </ListContext.Provider>
  );
};

export const useLists = () => {
  const context = React.useContext(ListContext);
  if (!context) {
    throw new Error('useLists must be used within a ListProvider');
  }
  return context;
};

export type { List };
