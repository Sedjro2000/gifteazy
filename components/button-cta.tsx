import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";


const CtaButton = () => {
    const router = useRouter()
    const { data: session, status } = useSession();
    const handleclick = ()=>{
        if(!session){
                router.push("/signin")
        }else{
            router.push("/articles")
        }
    }


  return (
    <button className="bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl active:bg-red-700 transition-all duration-300 ease-in-out" onClick={handleclick}>
      Trouvez votre cadeau 😊
    </button>
  );
};

export default CtaButton;
