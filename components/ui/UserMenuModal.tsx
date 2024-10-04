import React from 'react';
import { FaUserCircle, FaSignOutAlt, FaCog, FaTools, FaHistory } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface UserMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenuModal: React.FC<UserMenuModalProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!isOpen) return null;

  const handleMyAccount = () => {
    onClose();
    router.push('/profile');
  };

  const handleLogout = () => {
    onClose();
    signOut({ callbackUrl: '/' });
  };

  const handleSettings = () => {
    onClose();
    router.push('/settings'); 
  };



  const handleHistory = () => {
    onClose();
    router.push('/history'); 
  };
  return (
    <div className="absolute right-0 mt-4 w-96 bg-white shadow-lg rounded-xl py-4 px-8 z-50">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <FaUserCircle className="h-12 w-12 text-gray-600" />
          <div>
            <p className="text-lg font-semibold">{session?.user?.name || 'Guest'}</p>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
        <hr className="border-gray-300" />
        <button
          onClick={handleMyAccount}
          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-red-500 hover:bg-gray-100 p-3 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center">
            <FaCog className="mr-3" />
            <span>Mon compte</span>
          </div>
         
        </button>
        <button
          onClick={handleSettings}
          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-red-500 hover:bg-gray-100 p-3 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center">
            <FaTools className="mr-3" />
            <span>Paramètres</span>
          </div>
         
        </button>
        <button
          onClick={handleHistory}
          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-red-500 hover:bg-gray-100 p-3 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center">
            <FaHistory className="mr-3" />
            <span>Historique</span>
          </div>
         
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-red-500 hover:bg-gray-100 p-3 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center">
            <FaSignOutAlt className="mr-3" />
            <span>Se deconnecter </span>
          </div>
        
        </button>
      </div>
    </div>
  );
};

export default UserMenuModal;
