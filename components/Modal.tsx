import React from 'react';
import { useCart } from 'react-use-cart';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: { name: string; price: string; image: string } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
  const { addItem } = useCart();

  if (!isOpen || !item) return null;

  const handleAddToList = () => {
    addItem({
      id: item.name,
      name: item.name,
      price: parseFloat(item.price.replace('$', '')),
      image: item.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-yellow-100 bg-opacity-30 backdrop-blur-sm rounded-lg shadow-md w-1/2 flex overflow-hidden p-8">
        {/* Modal content */}
        <div className="flex-1 p-4">
          <img src={item.image} alt={item.name} className="w-full h-96 object-cover rounded-lg" />
          <button className="mt-4 flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
            Preview in your space
          </button>
        </div>
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-700 text-2xl">X</button>
          </div>
          <p className="text-yellow-300 mb-2">Coffee table, concrete, 90 cm</p>
          <p className="text-sm text-white mb-4">
            An organic shape and smooth finish of this concrete coffee table reflect nature's elegance. Made from lightweight, reinforced glass fibre concrete, it seamlessly blends durability with style.
          </p>
          <div className="mb-4">
            <span className="text-sm">Article Number: 903.031.06</span>
          </div>
          <div className="flex items-center mb-4">
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mr-4">
              -
            </button>
            <span>1</span>
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg ml-4">
              +
            </button>
          </div>
          <button
            onClick={handleAddToList}
            className="bg-yellow-500 text-white w-full py-2 rounded-lg"
          >
            Ajouter à la liste ({item.price})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
