'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Item = {
  id?: string;
  name: string;
  price: string;
  image: string;
  description: string;

};

type List = {
  id: string;
  title: string;
  items: Item[];
};

type ListContextType = {
  lists: List[];
  fetchLists: () => void;
  getListItems: (listId: string) => Promise<Item[] | null>; // ajout de la méthode ici
  addList: (listName: string) => Promise<void>;
  addItemToList: (listId: string, item: Item) => Promise<void>;
  deleteList: (listId: string) => Promise<void>;
  deleteItemFromList: (listId: string, itemId: string) => Promise<void>;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<List[]>([]);

  // Fonction pour récupérer les listes depuis la base de données
  const fetchLists = async () => {
    try {
      const res = await fetch('/api/lists');
      if (res.ok) {
        const data = await res.json();
        setLists(data);
      } else {
        console.error('Failed to fetch lists');
      }
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  // Fonction pour ajouter une nouvelle liste
  const addList = async (listName: string) => {
    if (!listName) {
      console.error('List name is required');
      return;
    }
  
    try {
      const res = await fetch('/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: listName ,  items: []  }),
      });
  
      if (res.ok) {
        const newList = await res.json();
        setLists((prevLists) => [...prevLists, newList]);
      } else {
        const errorData = await res.json();
        console.error('Failed to add list:', errorData);
      }
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };
  

  // Fonction pour ajouter un élément à une liste spécifique
  const addItemToList = async (listId: string, item: Item) => {
    try {
      const res = await fetch(`/api/lists/${listId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: item.id, quantity: 1 }), // Quantité par défaut à 1
      });

      if (res.ok) {
        const newItem = await res.json();
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? { ...list, items: [...(list.items || []), newItem] } // Initialiser items si nécessaire
              : list
          )
        );
        
      } else {
        console.error('Failed to add item to list');
      }
    } catch (error) {
      console.error('Error adding item to list:', error);
    }
  };

  // Fonction pour supprimer une liste
  const deleteList = async (listId: string) => {
    try {
      const res = await fetch(`/api/lists/${listId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      } else {
        console.error('Failed to delete list');
      }
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  // Fonction pour supprimer un élément d'une liste spécifique
  const deleteItemFromList = async (listId: string, itemId: string) => {
    try {
      const res = await fetch(`/api/list/${listId}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
              : list
          )
        );
      } else {
        console.error('Failed to delete item from list');
      }
    } catch (error) {
      console.error('Error deleting item from list:', error);
    }
  };

  const getListItems = async (listId: string) => {
    console.log("l'id de la liste",listId)
    const res = await fetch(`/api/lists/${listId}/items`);
    const items = await res.json();
    console.log("les articles de la liste",items)
    return items;
  };
  
  useEffect(() => {
    fetchLists(); // Charger les listes au démarrage
  }, []);

  return (
    <ListContext.Provider value={{ lists, fetchLists, addList, addItemToList, deleteList, deleteItemFromList, getListItems }}>
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
