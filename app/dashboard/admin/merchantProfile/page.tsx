"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";

const MerchantForm = () => {
  const { data: session } = useSession();
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [taxIdentificationNumber, setTaxIdentificationNumber] = useState("");
  const [idDocument, setIdDocument] = useState(null);

  const onDrop = (acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    setIdDocument(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'application/pdf': [] } });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("idDocument", idDocument);
    formData.append("storeName", storeName);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("taxIdentificationNumber", taxIdentificationNumber);
    formData.append("userId", session?.user.id); // Récupère l'ID utilisateur

    const response = await fetch("/api/merchants", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result); // Gestion du succès
    } else {
      console.error("Erreur lors de l'envoi du formulaire");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du magasin"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Numéro d'identification fiscale"
        value={taxIdentificationNumber}
        onChange={(e) => setTaxIdentificationNumber(e.target.value)}
        required
      />
      <div {...getRootProps()} style={{ border: "2px dashed gray", padding: "20px", margin: "10px 0" }}>
        <input {...getInputProps()} />
        <p>Déposez un fichier PDF ici, ou cliquez pour sélectionner un fichier</p>
      </div>
      <button type="submit">Soumettre</button>
    </form>
  );
};

export default MerchantForm;
