"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'


const merchantSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  taxIdentificationNumber: z.string().optional(),
});

type MerchantForm = z.infer<typeof merchantSchema>;

export default function MerchantFormPage() {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<MerchantForm>();
  const router = useRouter()

  const onSubmit = async (data: MerchantForm) => {
  
    if (!session){
      router.push("/signin")
      return;
    }
    if (!session || !session.user.id) {
      console.error("User ID is not available from the session");
      return;
    }

    const userId = session.user.id; 

    const response = await fetch('/api/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, userId }), 
    });

    if (response.ok) {
      console.log("Merchant created successfully");
      router.push( '/dashboard/merchant')
    } else {
      const errorData = await response.json();
      console.error("Error creating merchant:", errorData);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Creer votre boutique  🏬  🛍️</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom de la boutique</label>
            <input 
              type="text" 
              {...register("storeName")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
            {errors.storeName && <p className="text-red-500 text-sm">{errors.storeName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Addresse</label>
            <input 
              type="text" 
              {...register("address")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Numero de telephone</label>
            <input 
              type="text" 
              {...register("phoneNumber")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Numero IFU</label>
            <input 
              type="text" 
              {...register("taxIdentificationNumber")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <button 
            type="submit" 
            className="mt-4 w-full bg-blue-600 text-white font-semibold rounded-md p-2 transition duration-200 hover:bg-blue-700"
          >
            S enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
