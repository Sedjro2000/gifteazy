'use client'
import React, { useState, useEffect } from 'react';

type FilterSidebarProps = {
  filters: Record<string, any>;
  priceRange: { min: string; max: string };
  onFilterChange: (updatedFilters: Record<string, any>, updatedPriceRange: { min: string; max: string }) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, priceRange, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>(priceRange.min);
  const [maxPrice, setMaxPrice] = useState<string>(priceRange.max);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Récupérer les catégories depuis l'API au chargement
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onFilterChange({ ...filters, categoryId }, { min: minPrice, max: maxPrice });
  };

  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
    onFilterChange(filters, { min, max });
  };

  return (
    <div className="w-1/4 p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filtrer les produits</h2>
      
      {/* Sélecteur de catégories */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Catégories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="my-2">
              <button 
                className={`px-2 py-1 rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Filtre par prix */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Plage de prix</h3>
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            value={minPrice} 
            onChange={(e) => handlePriceChange(e.target.value, maxPrice)} 
            className="w-1/2 p-1 border rounded"
          />
          <input 
            type="number" 
            placeholder="Max" 
            value={maxPrice} 
            onChange={(e) => handlePriceChange(minPrice, e.target.value)} 
            className="w-1/2 p-1 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
