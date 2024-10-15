'use client'
import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider'; // Slider pour le filtre de prix
import 'rc-slider/assets/index.css'; // Styles de base pour le slider

type FilterSidebarProps = {
  filters: Record<string, any>;
  priceRange: { min: string; max: string };
  onFilterChange: (updatedFilters: Record<string, any>, updatedPriceRange: { min: string; max: string }) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, priceRange, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(parseInt(priceRange.min));
  const [maxPrice, setMaxPrice] = useState<number>(parseInt(priceRange.max));
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [sizes, setSizes] = useState<string[]>(['XS', 'S', 'M', 'L', 'XL']);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>(['Red', 'Blue', 'Green', 'Black', 'White']);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [genders, setGenders] = useState<string[]>(['Homme', 'Femme', 'Unisexe']);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [ageRanges, setAgeRanges] = useState<string[]>(['Enfant', 'Adolescent', 'Adulte']);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

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
    onFilterChange({ ...filters, categoryId }, { min: minPrice.toString(), max: maxPrice.toString() });
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      // S'assurer que value est bien un tableau (range slider)
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
      onFilterChange(filters, { min: value[0].toString(), max: value[1].toString() });
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onFilterChange({ ...filters, size }, { min: minPrice.toString(), max: maxPrice.toString() });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onFilterChange({ ...filters, color }, { min: minPrice.toString(), max: maxPrice.toString() });
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    onFilterChange({ ...filters, gender }, { min: minPrice.toString(), max: maxPrice.toString() });
  };

  const handleAgeRangeChange = (ageRange: string) => {
    setSelectedAgeRange(ageRange);
    onFilterChange({ ...filters, ageRange }, { min: minPrice.toString(), max: maxPrice.toString() });
  };

  const handleRatingChange = (rating: number) => {
    setRating(rating);
    onFilterChange({ ...filters, rating }, { min: minPrice.toString(), max: maxPrice.toString() });
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Filtrer les produits</h2>

      {/* Section des catégories dans un grand conteneur flexible */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Catégories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 min-h-[40px] rounded-lg text-center whitespace-nowrap ${
                selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre de prix avec Slider */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Plage de prix</h3>
        <Slider
          range
          min={0}
          max={1000000}
          value={[minPrice, maxPrice]}
          onChange={handlePriceChange}
          trackStyle={[{ backgroundColor: 'blue', height: 6 }]}
          handleStyle={[{ borderColor: 'blue', height: 20, width: 20 }]}
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
        </div>
      </div>

      {/* Filtre de taille */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Tailles</h3>
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 rounded-full border ${
                selectedSize === size ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre de genres */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Genre</h3>
        <div className="flex space-x-2">
          {genders.map((gender) => (
            <button
              key={gender}
              className={`px-3 py-1 rounded-full border ${
                selectedGender === gender ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleGenderChange(gender)}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre de tranche d'âge */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Tranche d'âge</h3>
        <div className="flex space-x-2">
          {ageRanges.map((ageRange) => (
            <button
              key={ageRange}
              className={`px-3 py-1 rounded-full border ${
                selectedAgeRange === ageRange ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleAgeRangeChange(ageRange)}
            >
              {ageRange}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre de note */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Note</h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`px-3 py-1 rounded-full border ${
                rating === star ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleRatingChange(star)}
            >
              {`${star}★`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
