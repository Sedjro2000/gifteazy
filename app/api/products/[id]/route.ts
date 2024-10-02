import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        productCategories: true, 
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description, price, imageUrl, stock, categoryIds } = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
        stock,
        productCategories: {
          deleteMany: {}, 
          create: categoryIds.map((categoryId: string) => ({
            categoryId,
          })),
        },
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
 
    await prisma.product.update({
      where: { id: id },
      data: {
        productCategories: {
          deleteMany: {}, 
        },
      },
    });

  
    await prisma.product.delete({
      where: { id: id },
    });

    console.log("Product deleted successfully");
   
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
