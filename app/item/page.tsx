'use client'
import React, { useState, useEffect } from 'react';
import FilterComponent from '@/components/FilterComponent';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  color: string;
  rating: number;
  image: string;
}

interface Filters {
  category: string[];
  priceRange: number[];
  brand: string[];
  color: string[];
  rating: string[];
}

const Item: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const productData: Product[] = [
      { id: 1, name: 'iPhone 13', category: 'Electronics', price: 950, brand: 'Apple', color: 'Red', rating: 5, image: 'https://via.placeholder.com/200?text=iPhone+13' },
      { id: 2, name: 'MacBook Pro', category: 'Electronics', price: 1200, brand: 'Apple', color: 'Blue', rating: 4, image: 'https://via.placeholder.com/200?text=MacBook+Pro' },
      { id: 3, name: 'Nike Air Max', category: 'Clothing', price: 250, brand: 'Nike', color: 'Red', rating: 4, image: 'https://via.placeholder.com/200?text=Nike+Air+Max' },
      { id: 4, name: 'Apple Watch', category: 'Electronics', price: 300, brand: 'Apple', color: 'Blue', rating: 5, image: 'https://via.placeholder.com/200?text=Apple+Watch' },
      { id: 5, name: 'Adidas T-Shirt', category: 'Clothing', price: 50, brand: 'Adidas', color: 'Red', rating: 3, image: 'https://via.placeholder.com/200?text=Adidas+T-Shirt' },
      { id: 6, name: 'Samsung Galaxy S21', category: 'Electronics', price: 850, brand: 'Samsung', color: 'Blue', rating: 4, image: 'https://via.placeholder.com/200?text=Samsung+Galaxy+S21' },
      // Ajoute plus de produits si nécessaire...
    ];

    setProducts(productData);
    setFilteredProducts(productData);
  }, []);

  const handleFilterChange = (filters: Filters) => {
    let filtered = products;

    if (filters.category.length > 0) {
      filtered = filtered.filter(product => filters.category.includes(product.category));
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    if (filters.brand.length > 0) {
      filtered = filtered.filter(product => filters.brand.includes(product.brand));
    }

    if (filters.color.length > 0) {
      filtered = filtered.filter(product => filters.color.includes(product.color));
    }

    if (filters.rating.length > 0) {
      filtered = filtered.filter(product => filters.rating.some(rating => product.rating >= Number(rating)));
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex">
      <FilterComponent onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-700">Prix : {product.price} CFA</p>
            <p className="text-gray-700">Marque : {product.brand}</p>
            <p className="text-gray-700">Couleur : {product.color}</p>
            <p className="text-gray-700">Note : {product.rating} étoiles</p>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Offrir</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Ajouter à une liste</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
