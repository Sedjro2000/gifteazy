'use client';
import React, { useState, useEffect } from 'react';
import { useLists } from '../context/ListsContext';
import { FiX } from 'react-icons/fi';
import Image from 'next/image'; 
import { v4 as uuidv4 } from 'uuid';
import {  useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: { name: string; price: string; image: string } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
  const { lists, addList, addItemToList } = useLists();
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [newListName, setNewListName] = useState<string>('');
  const { data: session, status } = useSession();
  const router = useRouter()
 
  useEffect(() => {
    if (isOpen) {
      // Reset the form when modal opens
      setSelectedListId('');
      setNewListName('');
    }
  }, [isOpen]);

  const handleAddToList = (e: { preventDefault: () => void; }) => {
    if (!session) {
      e.preventDefault(); 
      router.push('/signin')
    }
    if (newListName) {
      console.log('Creating new list with name:', newListName);
      addList(newListName); // Create a new list if the name is provided
      console.log('List created:', newListName);
      setNewListName(''); // Clear the input field
    } else if (selectedListId) {
      const itemToAdd = {
        id: uuidv4(), // Generate a unique ID for the item
        name: item?.name ?? '',
        price: item?.price ?? '',
        image: item?.image ?? '',
      };
  
      console.log('Adding item to existing list:', selectedListId);
      console.log('Item details:', itemToAdd);
  
      addItemToList(selectedListId, itemToAdd); // Add the item with an ID to the list
      console.log('Item added to list:', selectedListId, itemToAdd);
      onClose(); // Close the modal after adding the item
    } else {
      console.log('No list selected or new list name provided.');
    }
  };
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-yellow-100 bg-opacity-30 backdrop-blur-xl rounded-lg shadow-md w-1/2 flex overflow-hidden p-8">
        <div className="flex-1 p-4">
          {/* Step 2 & 3: Replace img with Image */}
          <Image 
            src={item.image} 
            alt={item.name} 
            width={500} // Adjust width as needed
            height={400} // Adjust height as needed
            className="w-full h-96 object-cover rounded-lg"
          />
          <button className="mt-4 flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
            Preview in your space
          </button>
        </div>
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-700 text-2xl"> <FiX /></button>
          </div>
          <p className="text-yellow-300 mb-2">Coffee table, concrete, 90 cm</p>
          <p className="text-sm text-white mb-4">
            An organic shape and smooth finish of this concrete coffee table reflect nature&apos;s elegance. Made from lightweight, reinforced glass fibre concrete, it seamlessly blends durability with style.
          </p>
          <div className="mb-4">
            <span className="text-sm">Article Number: 903.031.06</span>
          </div>
          <p className="text-yellow-300 mb-4">{item.price}</p>
          <div className="text-yellow-300 mb-4">
            ★★★★★
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Choose a list</label>
            <select 
              value={selectedListId} 
              onChange={(e) => setSelectedListId(e.target.value)} 
              className="border rounded p-2 w-full"
            >
              <option value="">Select a list</option>
              {lists.map(list => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Or create a new list</label>
            <input 
              type="text" 
              value={newListName} 
              onChange={(e) => setNewListName(e.target.value)} 
              placeholder="New list name" 
              className="border rounded p-2 w-full"
            />
          </div>
          <button 
            onClick={handleAddToList} 
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
          >
            {newListName ? 'Create and Add to List' : 'Add to List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
