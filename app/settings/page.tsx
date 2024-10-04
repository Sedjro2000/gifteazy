'use client';
import React, { useState } from 'react';
import { FaUserCog, FaLock, FaBell, FaCreditCard, FaHome, FaAddressBook,  FaQuestionCircle } from 'react-icons/fa';
import { MdPrivacyTip } from "react-icons/md";
import Image from 'next/image';
import ProfileSettings from '@/components/merchant/dashboard/ProfileSettings';
import AccountSecurity from '@/components/merchant/dashboard/security';
import PaymentMethods from '@/components/merchant/dashboard/PayementMethod';
import SupportPage from '@/components/merchant/dashboard/help';
import PrivacySettings from '@/components/merchant/dashboard/PrivacySettings';
import AddressBook from '@/components/merchant/dashboard/AddressBook';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { name: 'Paramètres du Profil', icon: <FaUserCog size={32} />, key: 'profile' },
  { name: 'Sécurité du Compte', icon: <FaLock  size={32}/ >, key: 'security' },
  { name: 'Préférences de Notification', icon: <FaBell size={32} />, key: 'notifications' },
  { name: 'Méthodes de Paiement', icon: <FaCreditCard  size={32}/>, key: 'payment' },
  { name: 'Carnet d\'Adresses', icon: <FaAddressBook size={32}/>, key: 'address' },
  { name: 'Paramètres de Confidentialité', icon: <MdPrivacyTip  size={32}/>, key: 'privacy' },
  { name: 'Aide & Support', icon: <FaQuestionCircle  size={32}/>, key: 'support' },
  

  ];

  return (
    <div className="flex bg-gray-100 h-screen  ">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md p-4 overflow-y-auto">
        <div className="flex items-center mb-8">
          
          <h1 className="text-2xl font-semibold ml-2">Paramètres</h1>
        </div>
        <nav className="flex flex-col gap-4">
          {sections.map(section => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center py-6 px-6 rounded-md hover:bg-red-100 transition-colors 
                ${activeSection === section.key ? 'bg-red-300 font-semibold' : 'bg-white'}`}
            >
              {section.icon}
              <span className="ml-2">{section.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/5 p-8">
        <h2 className="text-3xl font-bold mb-6">{activeSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
        {activeSection === 'profile' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Profil</h3>
            {/* Profile settings form goes here */}
            <ProfileSettings />
          </div>
        )}
        {activeSection === 'security' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Sécurité du compte</h3>
            {/* Account security settings form goes here */}
            <AccountSecurity />
          </div>
        )}
        {activeSection === 'notifications' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Notification</h3>
            {/* Notification preferences settings form goes here */}
           
          </div>
        )}
        {activeSection === 'payment' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Méthode de paiment</h3>
            {/* Payment methods settings form goes here */}
            <PaymentMethods />
          </div>
        )}
        {activeSection === 'address' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Addresse de livraison</h3>
            {/* Address book settings form goes here */}
            <AddressBook />
          </div>
        )}
        {activeSection === 'privacy' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Vie privée</h3>
            {/* Privacy settings form goes here */}
            <PrivacySettings />
          </div>
        )}
        {activeSection === 'support' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Aide</h3>
            {/* Help & support information goes here */}
            <SupportPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
