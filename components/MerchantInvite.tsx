'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MerchantInvite = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleButtonClick = () => {
    if (!session) {
      router.push(`/signin?callbackUrl=/merchantProfile`);
    } else {
      router.push("/merchantProfile");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-10">
 
      <div className="w-1/2">
        <Image
          src="/merchant.png" 
          alt="Invitation au marchand"
          width={400} 
          height={300} 
          className="object-contain"
        />
      </div>

    
      <div className="w-1/2 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Devenez Marchand
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Commencez à vendre vos produits sur notre plateforme. Rejoignez-nous aujourd &apos;hui et atteignez un large public.
        </p>
        <button 
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          onClick={handleButtonClick}
        >
          Commencer Maintenant
        </button>
      </div>
    </div>
  );
};

export default MerchantInvite;
