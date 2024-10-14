'use client'
import React from "react";
import Link from "next/link";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image'

const handleLogout = () => {

  signOut({ callbackUrl: '/' });
};

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/dashboard"> <Image  src='/cadeau.png'  alt='logo' width={50} height={50}/></Link>

        <div className="flex items-center space-x-4">
          <button className=" flex items-center space-x-4 text-black hover:text-gray-600"> <FaUser size={32} /> <span>Mon espace</span></button>

          <button className="flex items-center space-x-2 text-red-600 hover:text-red-800" onClick={handleLogout}>
            <FaSignOutAlt size={32}/>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
