import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity');
  
    const filters: any = {
      price: { gte: minPrice, lte: maxPrice },
    };
  
    if (categoryId) {
      filters.productCategories = { some: { categoryId } };
  
      // Récupère les filtres associés à la catégorie
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
        include: { filters: true },
      });
  
      // Applique les filtres dynamiques
      category?.filters.forEach((filter: { name: string; type: string; }) => {
        const value = searchParams.get(filter.name);
        if (value) {
          if (filter.type === 'text') {
            filters[filter.name] = value;
          } else if (filter.type === 'select' || filter.type === 'checkbox') {
            filters[filter.name] = { in: value.split(',') }; // Gérer plusieurs valeurs
          }
        }
      });
    }
  
    const products = await prisma.product.findMany({
      where: filters,
      include: {
        productCategories: true,
      },
    });
  
    return NextResponse.json(products);
  }
  