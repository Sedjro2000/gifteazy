'use client'
import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Image src='/cadeau.png' alt='logo' width={50} height={50} />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="/" className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Home</Link>
              <Link href="/list" className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Mes listes</Link>
              <Link href="/articles" className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Articles</Link>
            
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-white p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View profile</span>
              <FaUserCircle className="h-8 w-8" aria-hidden="true" />
            </button>
            {/*<button className="ml-4 bg-white p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View cart</span>
              <FaShoppingCart className="h-8 w-8" aria-hidden="true" />
            </button>
            <button onClick={toggleMenu} className="ml-4 md:hidden p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isOpen ? <FaTimes className="h-8 w-8" /> : <FaBars className="h-8 w-8" />}
            </button>*/}
          </div>
        </div>
      </div>
      {/* Menu mobile */}
      <div
        className={`fixed inset-y-0 right-0 w-1/2 bg-white/30 backdrop-blur-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-500">
            <FaTimes className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <a href="/" className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Home</a>
          <a href="/list" className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Mes Listes</a>
          <a href="/services" className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Services</a>
          <a href="/contact" className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
