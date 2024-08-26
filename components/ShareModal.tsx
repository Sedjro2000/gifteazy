'use client'
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi'; // For the close button icon


interface ShareModalProps {
  listName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ listName, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    const demoUserName = 'user123'; // Placeholder for user name
    const shareableLink = `${window.location.origin}/lists/${demoUserName}/${listName}`;
    alert(`Shared with ${email}. Shareable link: ${shareableLink}`);
    onClose(); // Close the modal after sharing
  };

  const handleCopyLink = () => {
    const shareableLink = `${window.location.origin}/lists/user123/${listName}`;
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
   // setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-4 md:mx-0 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors duration-300"
        >
          <FiX />
        </button>
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          Share "{listName}"
        </h3>
      
        <div className="mb-6">
          <label className="text-gray-300 mb-3 block text-sm">Share read-only link</label>
          <div className="flex items-center">
            <input
              type="text"
              value={`${window.location.origin}/lists/user123/${listName}`}
              readOnly
              className="flex-1 text-white border border-gray-400 focus:outline-none focus:border-indigo-400 transition-all duration-300 p-4 rounded-l-full bg-transparent"
            />
            <button
              onClick={handleCopyLink}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-4 rounded-r-full shadow-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300"
            >
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
