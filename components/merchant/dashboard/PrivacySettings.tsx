'use client';
import React, { useState } from 'react';

const PrivacySettings: React.FC = () => {
  const [dataSharing, setDataSharing] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [emailPreferences, setEmailPreferences] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Privacy Settings Saved:', { dataSharing, tracking, emailPreferences });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Paramètres de Confidentialité</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Partager mes données avec des partenaires</label>
          <input
            type="checkbox"
            checked={dataSharing}
            onChange={(e) => setDataSharing(e.target.checked)}
            className="h-6 w-6 text-red-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Autoriser le suivi de mes activités</label>
          <input
            type="checkbox"
            checked={tracking}
            onChange={(e) => setTracking(e.target.checked)}
            className="h-6 w-6 text-red-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Recevoir des e-mails promotionnels</label>
          <input
            type="checkbox"
            checked={emailPreferences}
            onChange={(e) => setEmailPreferences(e.target.checked)}
            className="h-6 w-6 text-red-500"
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-6 rounded"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default PrivacySettings;
