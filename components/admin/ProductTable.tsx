'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import ProductFormModal from '@/components/admin/ProductForm';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'; 

interface Product {
  id: string; 
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;  
  createdAt: string;
  updatedAt: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/all");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = (id: string) => {
    setSelectedProductId(id);
    setIsOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[calc(100vh-200px)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des produits</h2>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-lg"
          onClick={() => setIsOpen(true)} 
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left border">Image</th>
              <th className="px-2 py-2 text-left border">Nom du produit</th>
              <th className="px-2 py-2 text-left border">Description</th>
              <th className="px-2 py-2 text-left border">Prix</th>
              <th className="px-2 py-2 text-left border">Stock</th>
              <th className="px-2 py-2 text-left border">Créé le</th>
              <th className="px-2 py-2 text-left border">Modifié le</th>
              <th className="px-2 py-2 text-left border">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-2">
                    <Image
                      src={product.image}
                      alt="img"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">{product.price.toFixed(2)} CFA</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(product.updatedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button onClick={() => handleUpdate(product.id)}>
                      <FaEdit className="text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={() => confirmDelete(product.id)}>
                      <FaTrash className="text-red-600 hover:text-red-800" />
                    </button>
                    <button>
                      <FaEye className="text-green-600 hover:text-green-800" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Aucun produit disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

  
      <div className="mt-4 flex justify-between items-center">
        <button className="px-4 py-2 border rounded-lg">Précédent</button>
        <div className="space-x-2">
          <button className="px-4 py-2 border rounded-lg">1</button>
          <button className="px-4 py-2 border rounded-lg">2</button>
          <button className="px-4 py-2 border rounded-lg">3</button>
        </div>
        <button className="px-4 py-2 border rounded-lg">Suivant</button>
      </div>

      
      {isOpen && (
        <ProductFormModal 
          onClose={() => setIsOpen(false)} 
          onProductCreated={fetchProducts}  // Passe la fonction de mise à jour
        />
      )}

    
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold">Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            <div className="flex justify-end mt-4">
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  handleDelete(selectedProductId!);
                  setIsDeleteModalOpen(false);
                }}
              >
                Supprimer
              </button>
              <button 
                className="bg-gray-300 text-black px-4 py-2 rounded-lg ml-2"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
