import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = searchParams.get('maxPrice') === 'Infinity' ? undefined : parseFloat(searchParams.get('maxPrice') || '0');

  // Initialisation des filtres de base (prix)
  const filters: any = {
    price: { gte: minPrice, ...(maxPrice ? { lte: maxPrice } : {}) },
  };

  console.log('Filtres de prix:', filters.price);

  // Si une catégorie est sélectionnée
  if (categoryId) {
    filters.productCategories = { some: { categoryId } };

    console.log('ID de la catégorie:', categoryId);

    // Récupération des filtres associés à cette catégorie
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { filters: true }, // Inclure les filtres associés
    });

    if (!category) {
      console.log('Catégorie non trouvée');
      return NextResponse.json([]);
    }

    console.log('Filtres associés à la catégorie:', category.filters);

    // Application des filtres dynamiques
    /*category?.filters.forEach((filter: { name: string; type: string }) => {
      const value = searchParams.get(filter.name);
      if (value) {
        console.log(`Application du filtre ${filter.name} avec la valeur :`, value);

        if (filter.type === 'text') {
          filters[filter.name] = value;
        } else if (filter.type === 'select' || filter.type === 'checkbox') {
          filters[filter.name] = { in: value.split(',') }; // Gérer plusieurs valeurs
        }
      }
    });*/
  }

  console.log('Filtres finaux:', filters);

  // Récupération des produits avec les filtres appliqués
  try {
    const products = await prisma.product.findMany({
      where: filters,
      include: {
        productCategories: true,
      },
    });

    console.log('Produits trouvés:', products.length);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return NextResponse.json({ message: 'Erreur lors de la récupération des produits', error }, { status: 500 });
  }
}
