import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { categoryId: string } }) {
    const { categoryId } = params;
  
    try {
      const products = await prisma.product.findMany({
        where: {
          productCategories: {
            some: { categoryId },
          },
        },
        include: {
          productCategories: true,
        },
      });
  
      return NextResponse.json(products);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
  }
  