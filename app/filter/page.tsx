'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
interface Category {
    id: string;
    name: string;
    description: string;
    parentId: string | null; 
    createdAt: string;
    updatedAt: string;
    children?: Category[]; 
  }
  

  interface Filter {
    id: string;
    name: string;
    type: string;
    values: string[];
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  }
  interface PriceRange {
    min: string;
    max: string;
  }

const FilterSidebar: React.FC = () => {
 
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filter[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: '', max: '' });
  // Charger les catégories au début
  useEffect(() => {
    console.log('Fetching categories...');
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => {
        console.log('Categories loaded:', data);
        setCategories(data);
      })
      .catch((error) => console.error('Error loading categories:', error));
  }, []);

  console.log( ' les categries sont :',categories)
  const mainCategories = categories.filter(category => category.parentId == null);
  console.log('les principale sont ', mainCategories)
  mainCategories.forEach((category) => {
    console.log(`Sous-catégories pour ${category.name}:`, category.children);
  });


  // Charger les sous-catégories et filtres dynamiques lorsqu'une catégorie est sélectionnée
  useEffect(() => {
    if (selectedCategory) {
      const categoryId = selectedCategory;
      console.log(`Fetching subcategories and filters for category: ${categoryId}`);

     

fetch(`/api/filters/category/${categoryId}`)
  .then((response) => response.json())
  .then((data) => {
    console.log('Filters loaded:', data); 
    
    // Assurez-vous que data est bien un tableau
    const filters = Array.isArray(data) ? data : []; // Cela garantira que filters est un tableau
    console.log('Processed filters:', filters); // Vérifiez ce qui est traité

    if (filters.length > 0) {
      setFilters(filters); // Mettre à jour l'état avec les filtres récupérés
    } else {
      console.error('Aucun filtre disponible. Le tableau est vide.');
      setFilters([]); // Initialiser à un tableau vide si aucun filtre
    }
  })
  .catch((error) => console.error('Error loading filters:', error));

    }
  }, [selectedCategory]);

  // Gérer la sélection des filtres et envoyer la requête de recherche
  const handleFilterChange = (filterName: string, value: string) => {
    const updatedFilters = {
      ...filters,
      [filterName]: value,
    };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters, priceRange); // Appelez la fonction pour récupérer les produits filtrés
  };
  
  // Gérer la modification de la plage de prix
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
    fetchProducts(filters, { ...priceRange, [name]: value });
  };

  // Requête pour récupérer les produits filtrés
  const fetchProducts = (appliedFilters: Record<string, any>, appliedPriceRange: { min: string; max: string }) => {
    const params = new URLSearchParams();
    Object.keys(appliedFilters).forEach((key) => {
      if (appliedFilters[key]) {
        params.append(key, appliedFilters[key]);
      }
    });
    if (appliedPriceRange.min) {
      params.append('minPrice', appliedPriceRange.min);
    }
    if (appliedPriceRange.max) {
      params.append('maxPrice', appliedPriceRange.max);
    }

    fetch(`/api/products/filter?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Filtered products loaded:', data);
      })
      .catch((error) => console.error('Error loading products:', error));
  };

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <Accordion type="single" collapsible>
  {mainCategories.map((category) => (
    <AccordionItem key={category.id} value={`category-${category.id}`}>
      <AccordionTrigger>{category.name}</AccordionTrigger>

      <AccordionContent>
        {/* Afficher les sous-catégories */}
        <div className="flex flex-col space-y-2 pl-4">
          {category.children && category.children.length > 0 ? (
            category.children.map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() => setSelectedCategory(subCategory.id)}
                className={`px-4 py-2 text-left rounded-md ${
                  selectedCategory === subCategory.id ? 'bg-blue-300 text-white' : 'bg-transparent'
                } hover:bg-blue-100`}
              >
                {subCategory.name}
              </button>
            ))
          ) : (
            <p>Aucune sous-catégorie</p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>


<div>
    {filters && filters.length > 0 ? (
      filters.map((filter) => (
        <div key={filter.id}>
          <label>{filter.name}</label>
          <select onChange={(e) => handleFilterChange(filter.name, e.target.value)}>
            <option value="">Sélectionnez...</option>
            {filter.values.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      ))
    ) : (
      <p>Aucun filtre disponible.</p> // Message si aucun filtre
    )}
  </div>



      {/* Plage de prix */}
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-2">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      {/* Bouton pour appliquer les filtres */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => fetchProducts(filters, priceRange)}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
