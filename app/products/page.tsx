'use client'
import { useState, useEffect } from 'react';
import { products, categories } from '@/lib/mockData';
import Image from 'next/image'; 
import React from 'react';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); 

  useEffect(() => {
    
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedBrand(null);
    setSelectedMaterial(null);
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice =
      (!minPrice || product.price >= +minPrice) && (!maxPrice || product.price <= +maxPrice);
    const matchesSize = selectedSize ? product.size === selectedSize : true;
    const matchesColor = selectedColor ? product.color === selectedColor : true;
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;

    return matchesCategory && matchesPrice && matchesSize && matchesColor && matchesBrand;
  });

  // Logique de pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-5">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 mx-1 rounded ${
              number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-5">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full lg:pr-10 mb-10 lg:mb-0">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Filtres</h2>

          {/* Filtre par catégorie */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Catégorie</h3>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory || ''}
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Filtres spécifiques aux catégories */}
          {selectedCategory === 'Clothing' && (
            <>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Taille</h3>
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => setSelectedSize(e.target.value)}
                  value={selectedSize || ''}
                >
                  <option value="">Toutes les tailles</option>
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Couleur</h3>
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => setSelectedColor(e.target.value)}
                  value={selectedColor || ''}
                >
                  <option value="">Toutes les couleurs</option>
                  {['Rouge', 'Bleu', 'Vert', 'Noir', 'Blanc'].map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {selectedCategory === 'Electronics' && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Marque</h3>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setSelectedBrand(e.target.value)}
                value={selectedBrand || ''}
              >
                <option value="">Toutes les marques</option>
                {['Marque A', 'Marque B', 'Marque C'].map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </aside>

      {/* Liste des produits */}
      <main className="lg:w-3/4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg p-5">
                <Image src={product.image} alt={product.name} width={400} height={300} className="w-full h-48 object-cover mb-4" />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">Catégorie : {product.category}</p>
                <p className="text-gray-500">Marque : {product.brand}</p>
                <p className="text-gray-900 font-bold">${product.price}</p>
              </div>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>

        {/* Pagination */}
        {renderPagination()}
      </main>
    </div>
  );
};

export default ProductsPage;
