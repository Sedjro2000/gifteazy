'use client';
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi'; 

interface ShareModalProps {
  listName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ listName, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const shareableLink = `${window.location.origin}/lists/user123/${listName}`;
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm z-50 transition-opacity duration-300">
      <div className="relative bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-4 md:mx-0 border border-gray-200 border-opacity-40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors duration-300"
        >
          <FiX />
        </button>
        <h3 className="text-3xl font-semibold text-white mb-8 text-center">
          Partager <span className="text-blue-200">{listName}</span>
        </h3>
      
        <div className="mb-8">
          <label className="text-gray-300 mb-3 block text-sm"></label>
          <div className="flex items-center rounded-full bg-white bg-opacity-30">
            <input
              type="text"
              value={`${window.location.origin}/lists/user123/${listName}`}
              readOnly
              className="flex-1 text-white text-lg border-none focus:outline-none p-4 rounded-l-full bg-transparent placeholder-white"
            />
            <button
              onClick={handleCopyLink}
              className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-r-full transition-all duration-300 ${
                copied ? 'bg-green-400 hover:bg-green-500' : 'hover:from-purple-400 hover:to-blue-400'
              }`}
            >
              {copied ? 'Lien copié!' : 'Copy Link'}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
