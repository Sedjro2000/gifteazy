'use client'
import React, { useState } from 'react';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (listName: string) => void;
}

const CreateListModal: React.FC<CreateListModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [listName, setListName] = useState<string>('');

  const handleCreate = () => {
    if (listName.trim()) {
      onCreate(listName.trim());
      setListName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Create a new list</h2>
        <input
          type="text"
          placeholder="List name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
