import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { getSession } from 'next-auth/react'; 


export async function POST(req: Request, { params }: { params: { id: string } }) {
   /* const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }*/
  
    const body = await req.json();
    const { productId, quantity } = body;
  
    if (!productId || !quantity) {
      return NextResponse.json({ error: 'Product ID and quantity are required' }, { status: 400 });
    }
  
    const listItem = await prisma.listItem.create({
      data: {
        listId: params.id,
        productId,
        quantity,
      },
    });
  
    return NextResponse.json(listItem);
  }



  export async function GET(req: Request, { params }: { params: { id: string } }) {
    const listItems = await prisma.listItem.findMany({
      where: {
        listId: params.id, // On récupère les produits associés à cette liste
      },
      include: {
        product: true, // Inclure les détails du produit s'il y a une relation définie
      },
    });
  
    if (!listItems) {
      return NextResponse.json({ error: 'No items found for this list' }, { status: 404 });
    }
  
    return NextResponse.json(listItems);
  }
  

