
import Hero from '@/components/Hero'
import Image from "next/image";
import About from "@/components/About";
import Popular from '@/components/Popular';
import CategorySection from '@/components/Category';

export default function Home() {
  return (
   <div>
    <Hero />
    <Popular />
    <CategorySection />
    

   </div>
  );
}
