'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Item = {
  id: string;
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
  addItemToList: (listId: string, item: Item) => void;
  deleteList: (listId: string) => void;
  deleteItemFromList: (listId: string, itemId: string) => void;
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
      const newList: List = {
        id: generateUniqueId(),
        name: name,
        items: [],
      };
      console.log('Added new list:', newList);
      return [...prevLists, newList];
    });
  };

  const addItemToList = (listId: string, item: Item) => {
    setLists(prevLists => {
      const updatedLists = prevLists.map(list => {
        if (list.id === listId) {
          const updatedItems = [...list.items, { ...item, id: generateUniqueId() }];
          return { ...list, items: updatedItems };
        }
        return list;
      });
      return updatedLists;
    });
  };

  const deleteList = (listId: string) => {
    setLists(prevLists => {
      console.log('Current lists before deletion:', JSON.stringify(prevLists, null, 2));
      const updatedLists = prevLists.filter(list => list.id !== listId);
      console.log('Updated lists after deletion:', JSON.stringify(updatedLists, null, 2));
      return updatedLists;
    });
  };

  const deleteItemFromList = (listId: string, itemId: string) => {
    setLists(prevLists => {
      console.log('Current lists before item deletion:', JSON.stringify(prevLists, null, 2));

      const updatedLists = prevLists.map(list => {
        if (list.id === listId) {
          const updatedItems = list.items.filter(item => item.id !== itemId);
          console.log(`Updated items after deleting item ${itemId}:`, JSON.stringify(updatedItems, null, 2));
          return { ...list, items: updatedItems };
        }
        return list;
      });

      console.log('Updated lists after item deletion:', JSON.stringify(updatedLists, null, 2));
      return updatedLists;
    });
  };

  const generateUniqueId = (): string => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <ListContext.Provider value={{ lists, addList, addItemToList, deleteList, deleteItemFromList }}>
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

export type { List, Item };
