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
  const placeholderss = [
    "Valentine's is coming 💖",
    "Big day ahead - Wedding 🎊",
    "Mother's Day surprises 🌸",
    "Xmas gift ideas 🎁",
    "Baby on the way 👶"
  ];
  const placeholders = [
    "La Saint-Valentin approche 💖",
    "Le grand jour - Mariage 🎊",
    "Surprises pour la fête des mères 🌸",
    "Idées cadeaux de Noël 🎁",
    "Bébé arrive bientôt 👶"
  ];
  
  

  const [listName, setListName] = useState<string>("");

  const handleCreate = () => {
    if (listName.trim()) {
      onCreate(listName.trim());
      setListName("");
      onClose();
      console.log("submitted");
      console.log("closed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Créer une nouvelle liste 🎁
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => setListName(e.target.value)}
          onSubmit={handleCreate}
        />
        <div className="mt-10">
        <button onClick={onClose} className="mr-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Annuler
          </button>
        </div>
           
      </div>
    </div>
  );
};

export default CreateListModal;
