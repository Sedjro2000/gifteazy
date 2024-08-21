"use client";

import Image from "next/image";
import { FaGift, FaHandSparkles, FaRegLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-wide">
          À Propos de Nous
        </h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Description Section */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">
              Notre Mission
            </h3>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              Chez <span className="font-bold text-gray-900">Gift</span>, nous croyons que chaque moment mérite d'être célébré avec un cadeau spécial. Notre mission est de rendre ces moments inoubliables en vous offrant une sélection soigneusement choisie de cadeaux pour toutes les occasions. Que ce soit pour un anniversaire, une fête ou une simple surprise, nous avons quelque chose de parfait pour chaque personne et chaque événement.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Nous nous engageons à offrir une expérience d'achat exceptionnelle avec une attention particulière aux détails, un service client de premier ordre, et une passion pour apporter de la joie à chaque occasion.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative h-[450px] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-105 hover:shadow-2xl">
            <Image
              src="/about.webp" // Assurez-vous de remplacer cette URL par le chemin correct de votre image
              alt="À propos de nous"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-semibold text-gray-900 mb-12">
            Nos Valeurs
          </h3>
          <div className="grid sm:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg p-8 bg-white rounded-xl shadow-xl">
              <FaGift className="text-gray-700 w-14 h-14 mb-6" />
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Qualité</h4>
              <p className="text-gray-600 text-lg">Nous sélectionnons uniquement des cadeaux de haute qualité pour garantir votre satisfaction.</p>
            </div>
            <div className="flex flex-col items-center text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg p-8 bg-white rounded-xl shadow-xl">
              <FaHandSparkles className="text-gray-700 w-14 h-14 mb-6" />
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Créativité</h4>
              <p className="text-gray-600 text-lg">Nos cadeaux sont choisis avec soin pour leur originalité et leur capacité à surprendre.</p>
            </div>
            <div className="flex flex-col items-center text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg p-8 bg-white rounded-xl shadow-xl">
              <FaRegLightbulb className="text-gray-700 w-14 h-14 mb-6" />
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Innovation</h4>
              <p className="text-gray-600 text-lg">Nous recherchons constamment des idées nouvelles pour vous offrir des cadeaux uniques.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
