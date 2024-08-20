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
  addItemToList: (listName: string, item: Item) => void;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<List[]>(() => {
    if (typeof window !== 'undefined') { // Ensure this runs only in the browser
      const savedLists = localStorage.getItem('lists');
      console.log('Loaded lists from localStorage:', savedLists);
      return savedLists ? JSON.parse(savedLists) : [];
    }
    return []; // Default to an empty array if not in the browser
  });

  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure this runs only in the browser
      localStorage.setItem('lists', JSON.stringify(lists));
      console.log('Saved lists to localStorage:', lists);
    }
  }, [lists]);

  const addList = (name: string) => {
    setLists(prevLists => [
      ...prevLists,
      {
        id: generateUniqueId(), // Ensure a unique ID is generated
        name: name,
        items: [],
      }
    ]);
    console.log('Added new list:', name);
  };

  const addItemToList = (listName: string, item: Item) => {
    setLists(prevLists => {
      const updatedLists = prevLists.map(list =>
        list.name === listName ? { ...list, items: [...list.items, item] } : list
      );
      console.log('Item added to list:', listName, item);
      return updatedLists;
    });
  };

  // Helper function to generate unique IDs
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
