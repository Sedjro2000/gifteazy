'use client';
import React, { useState } from 'react';

interface Address {
  id: number;
  fullName: string;
  addressLine: string;
  city: string;
  country: string;
  phone: string;
}

const AddressBook: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      fullName: 'John Doe',
      addressLine: '123 Rue de Paris',
      city: 'Paris',
      country: 'France',
      phone: '+33 123 456 789',
    },
  ]);

  const [newAddress, setNewAddress] = useState<Address>({
    id: addresses.length + 1,
    fullName: '',
    addressLine: '',
    city: '',
    country: '',
    phone: '',
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
    setNewAddress({ id: addresses.length + 2, fullName: '', addressLine: '', city: '', country: '', phone: '' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Carnet d&apos;Adresses</h3>

      {/* List of addresses */}
      <div className="space-y-4 mb-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-gray-100 p-4 rounded-md">
            <h4 className="font-semibold">{address.fullName}</h4>
            <p>{address.addressLine}</p>
            <p>{address.city}, {address.country}</p>
            <p>{address.phone}</p>
          </div>
        ))}
      </div>

      {/* Add new address form */}
      <form onSubmit={handleAddAddress} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nom Complet</label>
          <input
            type="text"
            value={newAddress.fullName}
            onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Adresse</label>
          <input
            type="text"
            value={newAddress.addressLine}
            onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Ville</label>
          <input
            type="text"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Pays</label>
          <input
            type="text"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Téléphone</label>
          <input
            type="tel"
            value={newAddress.phone}
            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-6 rounded"
        >
          Ajouter une adresse
        </button>
      </form>
    </div>
  );
};

export default AddressBook;
