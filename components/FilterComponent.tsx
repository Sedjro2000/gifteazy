'use client'
import React, { useState } from 'react';


import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


interface Filters {
  category: string[];
  priceRange: number[];
  brand: string[];
  color: string[];
  rating: string[];
}

interface FilterComponentProps {
  onFilterChange: (filters: Filters) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 500]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string[]>([]);

  const categories = ['Electronics', 'Clothing', 'Furniture'];
  const brands = ['Nike', 'Apple', 'Samsung'];
  const colors = ['Red', 'Blue', 'Black'];
  const ratings = ['1', '2', '3', '4', '5'];

  const handleFilterChange = () => {
    onFilterChange({
      category: selectedCategory,
      priceRange: selectedPriceRange,
      brand: selectedBrand,
      color: selectedColor,
      rating: selectedRating,
    });
  };

  const handleCheckboxChange = (value: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    const updatedList = list.includes(value)
      ? list.filter(item => item !== value)
      : [...list, value];
    setList(updatedList);
    handleFilterChange();
  };

  return (
    <div className="filter-container p-6 bg-white rounded-lg shadow-md space-y-6 w-64">
      <h2 className="font-bold text-xl mb-4">Filtres</h2>

      {/* Plage de prix */}
      <div>
        <h3 className="font-semibold mb-2">Prix</h3>
        <Slider
          range
          min={0}
          max={1000}
          value={selectedPriceRange}
          onChange={(value) => {
            setSelectedPriceRange(value as number[]);
            handleFilterChange();
          }}
        />
        <div className="text-gray-500 mt-2">
          {selectedPriceRange[0]} CFA- {selectedPriceRange[1]} CFA
        </div>
      </div>

      {/* Catégories */}
      <div>
        <h3 className="font-semibold mb-2">Catégorie</h3>
        {categories.map(category => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              className="mr-2"
              checked={selectedCategory.includes(category)}
              onChange={() => handleCheckboxChange(category, selectedCategory, setSelectedCategory)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>

      {/* Marque */}
      <div>
        <h3 className="font-semibold mb-2">Marque</h3>
        {brands.map(brand => (
          <div key={brand} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={brand}
              className="mr-2"
              checked={selectedBrand.includes(brand)}
              onChange={() => handleCheckboxChange(brand, selectedBrand, setSelectedBrand)}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}
      </div>

      {/* Couleur */}
      <div>
        <h3 className="font-semibold mb-2">Couleur</h3>
        {colors.map(color => (
          <div key={color} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={color}
              className="mr-2"
              checked={selectedColor.includes(color)}
              onChange={() => handleCheckboxChange(color, selectedColor, setSelectedColor)}
            />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}
      </div>

      {/* Avis */}
      <div>
        <h3 className="font-semibold mb-2">Avis</h3>
        {ratings.map(rating => (
          <div key={rating} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={rating}
              className="mr-2"
              checked={selectedRating.includes(rating)}
              onChange={() => handleCheckboxChange(rating, selectedRating, setSelectedRating)}
            />
            <label htmlFor={rating}>{rating} étoile{rating > '1' && 's'} et plus</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
