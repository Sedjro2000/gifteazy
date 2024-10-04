'use client';
import React, { useState } from 'react';

const AccountSecurity: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveChanges = () => {
    console.log('Modifications de sécurité enregistrées:', {
      currentPassword,
      newPassword,
      confirmPassword,
      twoFactorEnabled,
    });
    // Handle form submission or API call here
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Sécurité du Compte</h3>

      {/* Change Password */}
      <div className="mb-6">
        <label className="block text-gray-700">Mot de passe actuel</label>
        <input 
          type="password" 
          value={currentPassword} 
          onChange={(e) => setCurrentPassword(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-2" 
          placeholder="Entrez votre mot de passe actuel" 
        />
        
        <label className="block text-gray-700">Nouveau mot de passe</label>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-2" 
          placeholder="Entrez un nouveau mot de passe" 
        />

        <label className="block text-gray-700">Confirmez le nouveau mot de passe</label>
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
          placeholder="Confirmez le nouveau mot de passe" 
        />
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-6">
        <label className="block text-gray-700">Authentification à deux facteurs (2FA)</label>
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            checked={twoFactorEnabled} 
            onChange={(e) => setTwoFactorEnabled(e.target.checked)} 
            className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded" 
          />
          <span className="ml-2">Activer l'authentification à deux facteurs</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">Ajoutez une couche de sécurité supplémentaire à votre compte en activant la 2FA.</p>
      </div>

      {/* Security Question (optional) */}
      <div className="mb-6">
        <label className="block text-gray-700">Question de sécurité</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded" 
          placeholder="Entrez une question de sécurité (optionnelle)" 
        />
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

export default AccountSecurity;
