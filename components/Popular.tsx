import React from 'react';
import Image from 'next/image';

type Product = {
  name: string;
  price: string;
  imageUrl: string;
};

const products: Product[] = [
  { name: 'Iphone 11 Pro max', price: '$25.00', imageUrl: '/gift0.jpg' },
  { name: 'Sneaker', price: '$12.00', imageUrl: '/gift1.jpg' },
  { name: 'ARKELSTORP', price: '$65.00', imageUrl: '/bouquet.png' },
];

const Popular: React.FC = () => {
  return (
    <section className="p-8 max-w-screen-2xl mx-auto text-center">
      <h2 className="text-sm font-medium text-gray-500">POPULAIRE</h2>
      <h1 className="text-3xl font-bold my-4">En vente maintenant!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.name} className="text-center">
            <div className="relative w-full h-64">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="mt-4 text-lg font-medium">{product.name}</p>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
