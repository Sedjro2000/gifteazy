import { NextResponse , NextRequest } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity');
  const categoryId = searchParams.get('categoryId');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  try {
    const filters: any = {
      AND: [
        { price: { gte: minPrice } },
        { price: { lte: maxPrice } },
      ],
    };

    if (name) filters.name = { contains: name, mode: 'insensitive' };
    if (categoryId) filters.productCategories = { some: { categoryId } };

    const products = await prisma.product.findMany({
      where: filters,
      include: {
        productCategories: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalCount = await prisma.product.count({ where: filters });

    return NextResponse.json({ data: products, total: totalCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    // Extraction des données du corps de la requête
    const {
      merchantId ,
      name,
      description,
      price,
      imageUrl,
      stock,
      categoryIds,
    } = await req.json();

    // Vérification que toutes les données nécessaires sont présentes
    if (!merchantId || !name || !price || !categoryIds) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Création du produit dans la base de données
    const product = await prisma.product.create({
      data: {
        merchantId,
        name,
        description,
        price,
        imageUrl,
        stock,
        productCategories: {
          create: categoryIds.map((categoryId: string) => ({
            categoryId,
          })),
        },
      },
      include: {
        productCategories: true, // Inclut les catégories associées dans la réponse
      },
    });

    // Retourne le produit créé
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}
