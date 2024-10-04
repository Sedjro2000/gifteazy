"use client";

import Image from "next/image";
import { FaGift, FaHeadphones, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import About from "./About";
import CtaButton from "./button-cta";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: "/valentine-3d.webp", alt: "Saint Valentin" },
    { src: "/noel-3d.webp", alt: "Noël" },
    { src: "/paques-3d.jpg", alt: "Pâques" },
    { src: "/gift3d.jpg", alt: "Anniversaire" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="  p-8 max-w-screen-2xl mx-auto">
      <div className="grid md:grid-cols-2 items-center gap-12 ">
        <div className="max-md:order-1 text-center md:text-left space-y-12 ">
          <h2 className="text-gray-800 lg:text-6xl md:text-5xl text-3xl font-extrabold mb-4 leading-tight">
            <span className="text-primary">Cadeau Spécial</span> pour{" "}
            <span className="text-secondary">Vos proches</span>
          </h2>
          <p className="text-gray-500 mt-6 text-lg leading-relaxed md:leading-7 ">
            Célébrez ce moment avec un cadeau unique qui montre combien vous
            tenez à cette personne. Notre sélection spéciale est conçue pour
            apporter de la joie et créer des souvenirs durables.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-4 items-start">
            {[
              { icon: FaStar, title: "Exclusif", desc: "Édition Limitée" },
              {
                icon: FaGift,
                title: "Choisi avec Soin",
                desc: "Cadeaux Curatés",
              },
              {
                icon: FaHeadphones,
                title: "Inoubliable",
                desc: "Moments Mémorables",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-110"
              >
                <item.icon className="w-12 h-12 mb-2 text-primary" />
                <h5 className="text-gray-800 font-bold text-xl mb-2">
                  {item.title}
                </h5>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <CtaButton />
        </div>

      
      </div>

      {/*<div className="grid md:grid-cols-3 gap-6 z-50 relative mt-12">
        {[
          { src: "/cadeau-1.jpg", title: "Cadeau de Luxe", desc: "Un cadeau premium pour des moments inoubliables." },
          { src: "/cadeau-2.jpg", title: "Cadeau Romantique", desc: "Le choix parfait pour célébrer l'amour." },
          { src: "/gift3d.jpg", title: "Cadeau Sur Mesure", desc: "Personnalisez votre cadeau pour rendre l'instant unique." },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-110 hover:shadow-2xl"
          >
            <Image src={item.src} alt={item.title} width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h5 className="text-gray-800 font-bold text-xl mb-2">{item.title}</h5>
              <p className="text-gray-500">{item.desc}</p>
              <button className="mt-4 bg-primary hover:bg-secondary text-white font-semibold text-sm rounded-md px-4 py-2">
                En savoir plus
              </button>
            </div>
          </div>
        ))}
      </div>*/}
    </div>
  );
}
