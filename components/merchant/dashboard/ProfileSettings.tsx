'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const ProfileSettings: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [language, setLanguage] = useState('fr');

  const handleSaveChanges = () => {
    console.log('Modifications enregistrées:', {
      username,
      email,
      phone,
      currentPassword,
      newPassword,
      language,
    });
    // Handle form submission or API call here
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Profil</h3>
      
      {/* Profile Picture */}
      <div className="mb-4">
        <label className="block text-gray-700">Photo de profil</label>
        <div className="flex items-center">
          {/* Placeholder image for the profile picture */}
          <Image 
            src="" // Placeholder image
            alt="Profile Picture" 
            width={64} 
            height={64} 
            className="rounded-full" 
          />
          <button className="ml-4 bg-red-500 text-white py-1 px-3 rounded">Changer</button>
        </div>
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-gray-700">Nom d'utilisateur</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
          placeholder="Entrez votre nom d'utilisateur" 
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Adresse email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
          placeholder="Entrez votre adresse email" 
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700">Numéro de téléphone</label>
        <input 
          type="text" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
          placeholder="Entrez votre numéro de téléphone" 
        />
      </div>

      {/* Password Change */}
      <div className="mb-4">
        <label className="block text-gray-700">Changer le mot de passe</label>
        <input 
          type="password" 
          value={currentPassword} 
          onChange={(e) => setCurrentPassword(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-2" 
          placeholder="Mot de passe actuel" 
        />
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
          placeholder="Nouveau mot de passe" 
        />
      </div>

      {/* Language Preferences */}
      <div className="mb-4">
        <label className="block text-gray-700">Préférences de langue</label>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button 
          onClick={handleSaveChanges} 
          className="bg-red-500 text-white py-2 px-6 rounded"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
