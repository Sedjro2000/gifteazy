'use client'
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaHome, FaList, FaBoxOpen } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import LoginRegisterModal from '@/components/LoginRegisterModal';
import { signOut, useSession } from "next-auth/react";
import Loading from './loading';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  const handleLogin = ()=> {
    router.push('/signin')
  }


  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    console.log("Session data: ", session);
    console.log("Session status: ", status);
  }, [session, status]);

 /* if (status === "loading") {
    return <p>Loading...</p>;
}*/
if (status ==="loading"){
  return <Loading />
}

if (status === "authenticated") {
    console.log("Session data:", session);
} else {
    console.log("User is not authenticated.");
}
console.log(session?.user?.name)

const handleLinkClick = (e: { preventDefault: () => void; }) => {
  if (!session) {
    e.preventDefault(); 
    router.push('/signin')
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

                
                <Link href="/list" className="text-gray-900 hover:text-blue-500 flex items-center space-x-2 " onClick={handleLinkClick}>
                  <FaList className="h-6 w-6" />
                  <span>Mes listes</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
            {session ? (
  <button
    onClick={handleLogout}
    className="bg-white p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hidden md:flex"
  >
    <span className="sr-only">Logout</span>
    <FaSignOutAlt className="h-8 w-8" aria-hidden="true" />
    <span>Logout</span>
  </button>
) : (
  <button className="flex items-center" onClick={handleLogin}>
    <FaSignInAlt className="h-8 w-8 text-gray-400 mr-2" aria-hidden="true" />
    <h1 className='text-gray-900 hover:text-blue-500'>Se connecter</h1>
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
  <span>Mes Listes</span>
</Link>
<Link href="/contact" className="text-gray-900 hover:text-blue-500 flex items-center space-x-2">
  <FaUserCircle className="h-6 w-6" />
  <span>Contact</span>
</Link>
<button
               onClick={handleLogout}
               className="text-gray-900 hover:text-blue-500 flex items-center space-x-2"
             >
               <span className="sr-only">Logout</span>
               <FaSignOutAlt className="h-8 w-8" aria-hidden="true" />
               <span>Logout</span>
             </button>
          </div>
        </div>
      </nav>
      <LoginRegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
