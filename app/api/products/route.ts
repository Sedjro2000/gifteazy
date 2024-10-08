import { NextResponse , NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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
    const {
      merchantId,
      name,
      description,
      price,
      image,  
      stock,
      categoryIds,
      filters // Filters selected by the user
    } = await req.json();

    // Validation des données
    if (!merchantId || !name || !price || !categoryIds || categoryIds.length === 0) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Upload de l'image à Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(image, {
      folder: 'product_images',
    });

    // Validation des categoryIds (Doit être des ObjectID valides)
    if (!categoryIds.every((id: string) => id.match(/^[0-9a-fA-F]{24}$/))) {
      return NextResponse.json({ error: 'Invalid categoryId format' }, { status: 400 });
    }

    // Check if filters is an object and convert to an array
    const filterEntries = typeof filters === 'object' && filters !== null 
      ? Object.entries(filters).map(([filterId, value]) => ({
          filter: { connect: { id: filterId } }, // Ensure filterId connects to the appropriate filter
          value,
        })) 
      : []; // Default to an empty array if filters is not valid

    // Création du produit
    const product = await prisma.product.create({
      data: {
        merchantId,
        name,
        description,
        price,
        imageUrl: uploadResult.secure_url,  
        stock,
        productCategories: {
          create: categoryIds.map((categoryId: string) => ({
            categoryId,
          })),
        },
        filters: {
          create: filterEntries, // Use the transformed filter entries
        },
      },
      include: {
        productCategories: true,
        filters: true, // Inclure les filtres dans la réponse
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2023') {
      return NextResponse.json({ error: 'Invalid ObjectID provided' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}

