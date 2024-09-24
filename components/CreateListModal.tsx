"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (listName: string) => void;
}

const CreateListModal: React.FC<CreateListModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const placeholders = [
    "La Saint-Valentin approche 💖",
    "Le grand jour - Mariage 🎊",
    "Surprises pour la fête des mères 🌸",
    "Idées cadeaux de Noël 🎁",
    "Bébé arrive bientôt 👶",
    "Anniversaire à venir 🎉",
    "Réussite académique 🎓",
    "Premier emploi 💼",
    "Célébration de la retraite 🎂",
    "Fête des pères 👔",
    "Remise de diplôme 🎓",
    "Anniversaire de mariage 🎂",
    "Pendaison de crémaillère 🏡",
    "Fête d'Halloween 🎃",
    "Nouvel An 🎇",
    "Journée internationale des femmes 👩",
    "Saint-Patrick 🍀",
    "Fête de la musique 🎶",
    "Fête des voisins 🏘️",
    "Baby shower 👶",
    "Fiançailles 💍",
    "Baptême ✝️",
    "Enterrement de vie de jeune fille 🎀",
    "Enterrement de vie de garçon 🎉",
    "Confirmation religieuse ⛪",
    "Célébration de promotion 🚀",
    "Anniversaire surprise 🎈",
    "Noël en famille 🎄",
    "Pâques 🐰",
    "Fête du travail 💪",
    "Halloween effrayante 👻",
    "Hanoukka 🕎",
    "Fête des grands-parents 👵👴",
    "Saint-Nicolas 🎅"
  ];
  
  const [listName, setListName] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setListName(value);

   
    if (value) {
      const filtered = placeholders.filter((placeholder) =>
        placeholder.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };


  const handleSelectSuggestion = (suggestion: string) => {
    setListName(suggestion); 
    setFilteredSuggestions([]); 
  };
  const handleCreate = () => {
    if (listName.trim()) {
      onCreate(listName.trim());
      setListName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="h-[40rem] flex flex-col justify-center items-center px-4 relative">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Créer une nouvelle liste 🎁
        </h2>

        {/* Input with placeholder suggestions */}
        <div className="relative w-full">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleInputChange} 
            onSubmit={handleCreate}
            value={listName}
          />

          {/* Dropdown with dynamic suggestions */}
          {filteredSuggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg z-10">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)} 
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10">
          <button
            onClick={onClose}
            className="mr-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
