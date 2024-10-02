'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 
import Modal from './Modal';
import FilterSidebar from '@/components/Filter';

type Item = {
  name: string;
  price: string;
  imageUrl: string;
  category: string;
};

type PriceRange = {
  min: string;
  max: string;
};

const ProductPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]); // Tous les produits
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // Produits filtrés
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Gérer les erreurs
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: '', max: '' });

  const router = useRouter();

  const isMobile = () => window.innerWidth <= 768;

  // Utilisation de useEffect pour récupérer les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/all');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setItems(data); // Mise à jour de la liste des items
        setFilteredItems(data); // Initialisation des items filtrés
        setLoading(false); // Désactivation de l'état de chargement
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Dépendance vide pour exécuter la fonction uniquement au montage du composant

  // Filtrer les produits en fonction des filtres appliqués
  const applyFilters = (updatedFilters: Record<string, any>, updatedPriceRange: PriceRange) => {
    let filtered = items;

    // Filtrer par catégorie ou autres filtres
    Object.keys(updatedFilters).forEach((key) => {
      if (updatedFilters[key]) {
        filtered = filtered.filter((item) => item.category === updatedFilters[key]);
      }
    });

    // Filtrer par plage de prix
    if (updatedPriceRange.min) {
      filtered = filtered.filter((item) => parseFloat(item.price) >= parseFloat(updatedPriceRange.min));
    }
    if (updatedPriceRange.max) {
      filtered = filtered.filter((item) => parseFloat(item.price) <= parseFloat(updatedPriceRange.max));
    }

    setFilteredItems(filtered); // Mettre à jour la liste des items filtrés
  };

  // Gérer les filtres appliqués et la plage de prix dans FilterSidebar
  const handleFilterChange = (updatedFilters: Record<string, any>, updatedPriceRange: PriceRange) => {
    setFilters(updatedFilters);
    setPriceRange(updatedPriceRange);
    applyFilters(updatedFilters, updatedPriceRange);
  };

  const handleItemClick = (item: Item) => {
    if (isMobile()) {
      router.push(`/product/${item.name}`);
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar des filtres */}
    

      {/* Liste des produits */}
      <div className="p-8 max-w-screen-2xl mx-auto w-3/4">
        <h2 className="text-2xl font-bold mb-4">Get inspired</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="relative w-full h-48">
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <button 
                    onClick={() => handleItemClick(item)} 
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
      </div>
    </div>
  );
};

export default ProductPage;
