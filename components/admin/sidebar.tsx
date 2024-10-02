'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CubeIcon, ShoppingCartIcon, UsersIcon, ChartBarIcon, TagIcon } from '@heroicons/react/24/outline';
import {  Truck, Grid } from 'lucide-react';



const Sidebar = () => {
  const pathname = usePathname();
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard/admin",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      name: "Produits",
      path: "/dashboard/admin/products",
      icon: <CubeIcon className="h-6 w-6" />,
    },
    {
      name: "Catégories",  
      path: "/dashboard/admin/categories",
      icon: <Grid className="h-6 w-6" />, 
    },
    {
      name: "Commandes",
      path: "/dashboard/admin/commandes",
      icon: <ShoppingCartIcon className="h-6 w-6" />,
    },
    {
      name: "Clients",
      path: "/dashboard/admin/clients",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      name: "Statistiques",
      path: "/dashboard/admin/statistiques",
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      name: "Promotions",
      path: "/dashboard/admin/promotions",
      icon: <TagIcon className="h-6 w-6" />,
    },

    {
      name: "Livraison",  // Nouveau menu pour Livraison
      path: "/dashboard/admin/livraison",
      icon: <Truck className="h-6 w-6" />, 
    },
  ];
  
  return (
    <div className=" min-h-screen w-full  text-gray-800 shadow-lg p-4 flex flex-col overflow-scroll">
     

      <div className="flex flex-col  space-y-6 mt-4">
        {menus.map((menu, index) => (
          <Link href={menu.path}
          key={index}
            className={`flex items-center p-5 rounded-xl transition-colors duration-200 ${
              pathname === menu.path
                ? "bg-black text-white "
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {" "}
            <div  >
                    <div className="flex gap-2">
                        <span className="mr-3"> {menu.icon} </span>
                        <span>{menu.name}</span>
                    </div>
              
              
            </div>{" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
