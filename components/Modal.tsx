'use client';
import React, { useState, useEffect } from 'react';
import { useLists } from '../context/ListsContext';
import { FiX } from 'react-icons/fi';
import Image from 'next/image'; 
import { v4 as uuidv4 } from 'uuid';
import {  useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/context/CartContext';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: { id: string; name: string; price: string; imageUrl: string;  description : string} | null;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
  const { lists, addList, addItemToList } = useLists();
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (isOpen) {
      // Reset the form when modal opens
      setSelectedListId('');
      setListName('');
    }
  }, [isOpen]);

  const handleAddToList = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    if (!item) return;
  
    try {
      // Si l'utilisateur veut créer une nouvelle liste
      if (listName) {
        // Créer une nouvelle liste
        await addList(listName);
        // Une fois la liste créée, trouver son ID dans `lists` (après le fetch)
        const newList = lists.find(list => list.title === listName);
        if (newList && newList.id) {
          // Ajouter l'item à la nouvelle liste
          await addItemToList(newList.id, {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.imageUrl,
            description: ''
          });
        }
      } else if (selectedListId) {
        // Si l'utilisateur a choisi une liste existante
        await addItemToList(selectedListId, {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.imageUrl,
          description: ''
        });
      }
  
      // Fermer le modal après avoir ajouté l'article
      onClose();
    } catch (error) {
      console.error('Failed to add item to list:', error);
    }
  };
  
  
  const handleAddToCart = () => {
    if (!item) return;
  
    const cartItem: CartItem = {
      id: uuidv4(),  
      productId: item.id,  
      quantity: 1,
      product: {
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
      }
    };
  
    console.log('Cart item to add:', cartItem); 
    addToCart(cartItem);  
    onClose();  
    console.log(cartItem);
  };
  

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-yellow-100 bg-opacity-30 backdrop-blur-xl rounded-lg shadow-md w-1/2 flex overflow-hidden p-8">
        <div className="flex-1 p-4">
          <Image 
            src={item.imageUrl} 
            alt={item.name} 
            width={500}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-700 text-2xl">
              <FiX />
            </button>
          </div>
          <p className="text-yellow-300 mb-2">  {item.description}</p>
        
          <p className="text-yellow-300 mb-4">{item.price} CFA </p>
       
          <div className="mb-4">
            <label className="block text-white mb-2">Choisir une liste</label>
            <select 
              value={selectedListId} 
              onChange={(e) => setSelectedListId(e.target.value)} 
              className="border rounded p-2 w-full"
            >
              <option value="">Select a list</option>
              {lists.map(list => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">ou creer une nouvelle liste</label>
            <input 
              type="text" 
              value={listName} 
              onChange={(e) => setListName(e.target.value)} 
              placeholder="New list name" 
              className="border rounded p-2 w-full"
            />
          </div>
          <div className=' mt-4 flex gap-2 justify-between p-2 '>
            <button 
              onClick={handleAddToList} 
              className="bg-blue-500 text-white rounded-full px-4 py-3 hover:bg-blue-600"
            >
              {listName ? 'Creer une liste ' : 'Ajouter à une liste '}
            </button>
            <button 
              onClick={handleAddToCart} 
              className="bg-green-500 text-white rounded-full px-4 py-3 hover:bg-green-600 "
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
