'use client'
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaHome, FaList, FaBoxOpen, FaSignOutAlt, FaSignInAlt, FaCog } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import LoginRegisterModal from '@/components/LoginRegisterModal';
import { signOut, useSession } from "next-auth/react";
import Loading from './loading';
import { useRouter } from 'next/navigation';
import UserMenuModal from './UserMenuModal';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 

const { totalItems } = useCart()


console.log('nbre dekement',totalItems)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen); 
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleLogin = () => {
    router.push('/auth/signin');
  }

  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    console.log("Session data: ", session);
    console.log("Session status: ", status);
  }, [session, status]);

  const handleLinkClick = (e: { preventDefault: () => void; }) => {
    if (!session) {
      e.preventDefault(); 
      router.push('/auth/signin');
    }
  };

  return (
    <>
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Image src='/cadeau.png' alt='logo' width={50} height={50} />
          </div>
          <div className="hidden md:flex">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="/" className="text-gray-900 hover:text-blue-500 flex items-center space-x-2">
                <FaHome className="h-6 w-6" />
                <span>Home</span>
              </Link>
              <Link href="/articles" className="text-gray-900 hover:text-blue-500 flex items-center space-x-2">
                <FaBoxOpen className="h-6 w-6" />
                <span>Articles</span>
              </Link>
              <Link href="/list" className="text-gray-900 hover:text-blue-500 flex items-center space-x-2">
                <FaList className="h-6 w-6" />
                <span>Mes listes</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
          
            <div className="relative">
              <Link href="/cart" className="text-gray-900 hover:text-blue-500">
                <FaShoppingCart className="h-8 w-8 text-gray-400" />
                {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {totalItems}
            </span>
          )}
              </Link>
            </div>
            {session ? (
              <div className="relative ml-4">
                <button
                  onClick={toggleUserMenu}
                  className="bg-white p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
                >
                  <FaUserCircle className="h-8 w-8" />
                </button>

                {isUserMenuOpen && (
                  <UserMenuModal isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
                )}
              </div>
            ) : (
              <button className="flex items-center ml-4" onClick={() => router.push('/auth/signin')}>
                <FaSignInAlt className="h-8 w-8 text-gray-400 mr-2" aria-hidden="true" />
                <h1 className="text-gray-900 hover:text-blue-500">Se connecter</h1>
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="ml-4 md:hidden p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isOpen ? <FaTimes className="h-8 w-8" /> : <FaBars className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </>
  );
};

export default Navbar;
