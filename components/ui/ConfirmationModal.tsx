import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string; 
  confirmText?: string; 
  cancelText?: string; 
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
}) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <div className='flex flex-col gap-4 p-4 justify-between'>
        <p>{message}</p>
        <div className="flex justify-end pt-2 ">
          <button onClick={onCancel} className="mr-2 bg-gray-300 px-4 py-2 rounded">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
            {confirmText}
          </button>
        </div>
        </div>
       
        
       
      </div>
    </div>
  );
};

export default ConfirmationModal;
