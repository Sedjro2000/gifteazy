'use client';
import React, { useState } from 'react';

const SupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'submit'>('faq');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', { name, email, message });
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Aide & Support</h3>

      {/* Tab Navigation */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('faq')}
          className={`py-2 px-4 rounded-tl-lg rounded-tr-lg ${
            activeTab === 'faq' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`py-2 px-4 ${
            activeTab === 'contact' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Nous Contacter
        </button>
        <button
          onClick={() => setActiveTab('submit')}
          className={`py-2 px-4 rounded-tl-lg rounded-tr-lg ${
            activeTab === 'submit' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Soumettre une Demande
        </button>
      </div>

      {/* FAQ Section */}
      {activeTab === 'faq' && (
        <div>
          <h4 className="text-lg font-semibold mb-4">Questions Fréquemment Posées</h4>
          <div className="mb-4">
            <h5 className="font-bold">Comment réinitialiser mon mot de passe ?</h5>
            <p className="text-gray-600">Vous pouvez réinitialiser votre mot de passe en allant dans les paramètres de sécurité de votre compte et en cliquant sur Réinitialiser le mot de passe.</p>
          </div>
          <div className="mb-4">
            <h5 className="font-bold">Comment mettre à jour mes informations de paiement ?</h5>
            <p className="text-gray-600">Rendez-vous dans les paramètres de paiement pour mettre à jour ou ajouter une nouvelle méthode de paiement.</p>
          </div>
          <div className="mb-4">
            <h5 className="font-bold">Comment contacter le service client ?</h5>
            <p className="text-gray-600">Vous pouvez nous contacter via e-mail, téléphone, ou chat en ligne, disponibles dans la section Nous Contacter.</p>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeTab === 'contact' && (
        <div>
          <h4 className="text-lg font-semibold mb-4">Nous Contacter</h4>
          <div className="mb-4">
            <h5 className="font-bold">E-mail</h5>
            <p className="text-gray-600">support@notreplatforme.com</p>
          </div>
          <div className="mb-4">
            <h5 className="font-bold">Téléphone</h5>
            <p className="text-gray-600">+1 234 567 890</p>
          </div>
          <div className="mb-4">
            <h5 className="font-bold">Chat en ligne</h5>
            <p className="text-gray-600">Disponible du lundi au vendredi, de 9h à 18h.</p>
          </div>
        </div>
      )}

      {/* Submit Request Section */}
      {activeTab === 'submit' && (
        <div>
          <h4 className="text-lg font-semibold mb-4">Soumettre une Demande d&apos;Assistance</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-6 rounded"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SupportPage;
