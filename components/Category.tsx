import React from 'react';

type Category = {
  name: string;
  imageUrl: string;
};

const categories: Category[] = [
  { name: 'Anniversaire', imageUrl: '/birthday.jpg' },
  { name: 'ValentineDay', imageUrl: '/valentine.jpg' },
  { name: 'Mariage', imageUrl: '/wedding.jpg' },
  { name: 'Noel', imageUrl: '/xmas.jpg' },
];

const CategorySection: React.FC = () => {
  return (
    <section className="p-8 max-w-screen-2xl mx-auto ">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Categorie</h2>
      <h1 className="text-3xl font-bold mb-8">Célébrez chaque occasion avec le cadeau parfait</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="text-center">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-4 text-lg font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
