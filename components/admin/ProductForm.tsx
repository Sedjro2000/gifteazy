"use client";
import { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";


type Filter = {
  id: string;
  name: string;
  type: string;
  values: string[];
};

function ProductFormModal({
  onClose,
  onProductCreated, // fonction appelée après création
}: {
  onClose: () => void;
  onProductCreated: () => void;
}) {
  const [merchantId] = useState("64bfc17f4dabc1234def5678");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [stock, setStock] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string | null;
  }>({}); // Filtres sélectionnés

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      console.log("Categories fetched: ", data); // Log pour vérifier les catégories récupérées
      setCategories(data);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchFilters() {
      if (categoryIds.length === 0) {
        setFilters([]);
        return;
      }
  
      try {
        // Prépare les IDs des catégories en les joignant avec une virgule
        const categoryIdString = categoryIds.join(',');
  
        console.log("Fetching filters for category IDs: ", categoryIdString);
  
        // Appel à la nouvelle route API pour récupérer les filtres en fonction des IDs des catégories
        const res = await fetch(`/api/filters/categories/${categoryIdString}`);
  
        if (!res.ok) {
          throw new Error(`Failed to fetch filters for categories ${categoryIdString}`);
        }
  
        const filters = await res.json();
  
        console.log("Filters fetched: ", filters); // Log pour vérifier les filtres récupérés
  
        // Mettre à jour les filtres récupérés
        setFilters(filters);
  
      } catch (error) {
        console.error("Error fetching filters: ", error);
      }
    }
  
    fetchFilters();
  }, [categoryIds]);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      console.error("No image selected");
      return;
    }

    // Convertir l'image en base64
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const imageBase64 = reader.result;

      try {
        const product = {
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          image: imageBase64,
          merchantId,
          categoryIds,
          filters: selectedFilters, // Ajouter les filtres sélectionnés ici
        };

        console.log("Submitting product: ", product); // Log pour vérifier les données du produit

        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (res.ok) {
          onProductCreated();
          onClose();
        } else {
          console.error("Failed to create product");
        }
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };
  };

  const handleCategoryChange = (
    selectedOptions: MultiValue<{ id: string; name: string }>
  ) => {
    const selectedCategoryIds = selectedOptions.map((opt) => opt.id);
    console.log("Selected category IDs: ", selectedCategoryIds); // Log pour vérifier la sélection des catégories
    setCategoryIds(selectedCategoryIds);
  };

  const handleFilterChange = (filterId: string, value: string) => {
    console.log("Filter changed: ", filterId, value); // Log pour vérifier les filtres sélectionnés
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prix
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Catégories
            </label>
            <Select
              isMulti
              value={categories.filter((category) =>
                categoryIds.includes(category.id)
              )}
              onChange={handleCategoryChange}
              getOptionLabel={(category) => category.name}
              getOptionValue={(category) => category.id}
              options={categories}
            />
          </div>

          {/* Ajout des filtres dynamiques */}
          {Array.isArray(filters) && filters.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Filtres</h3>
              {filters.map((filter) => (
                <div key={filter.id} className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {filter.name}
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg mb-4"
                    onChange={(e) =>
                      handleFilterChange(filter.name, e.target.value)
                    }
                  >
                    <option value="">Sélectionner une option</option>
                    {filter.values && filter.values.length > 0 ? (
                      filter.values.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))
                    ) : (
                      <option disabled>Aucune option disponible</option>
                    )}
                  </select>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
