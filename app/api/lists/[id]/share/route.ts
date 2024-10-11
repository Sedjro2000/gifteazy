import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { getSession } from 'next-auth/react'; 




export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const shareUrl = `${process.env.NEXT_PUBLIC_URL}/lists/${params.id}/share`; // URL publique pour partager la liste
  
    const updatedList = await prisma.list.update({
      where: { id: params.id },
      data: {
        isShared: true,
        shareUrl,
      },
    });
  
    return NextResponse.json(updatedList);
  }
  