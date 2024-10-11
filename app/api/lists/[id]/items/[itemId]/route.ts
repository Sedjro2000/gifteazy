import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 



export async function PUT(req: Request, { params }: { params: { id: string, itemId: string } }) {
    const body = await req.json();
    const { quantity, isGifted } = body;
  
    const listItem = await prisma.listItem.update({
      where: { id: params.itemId },
      data: { quantity, isGifted },
    });
  
    return NextResponse.json(listItem);
  }
  

  export async function DELETE(req: Request, { params }: { params: { id: string, itemId: string } }) {
    await prisma.listItem.delete({
      where: { id: params.itemId },
    });
  
    return NextResponse.json({ message: 'Item deleted' });
  }
  