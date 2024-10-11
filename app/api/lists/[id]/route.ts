import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { getSession } from 'next-auth/react'; 


export async function GET(req: Request, { params }: { params: { id: string } }) {
   /* const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }*/
  
    const list = await prisma.list.findUnique({
      where: { id: params.id },
      include: {
        listItems: {
          include: {
            product: true, // Récupère les détails du produit
          },
        },
      },
    });
  
    if (!list) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 });
    }
  
    return NextResponse.json(list);
  }
  


  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    /* const session = await getSession();
     if (!session) {
       return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
     }*/
   
     try {
       await prisma.list.delete({
         where: { id: params.id },
       });
   
       return NextResponse.json({ message: 'List deleted successfully' }, { status: 200 });
     } catch (error) {
       return NextResponse.json({ error: 'Error deleting list' }, { status: 500 });
     }
   }
   

   export async function PUT(req: Request, { params }: { params: { id: string } }) {
   /* const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
  */
    const { title } = await req.json(); 
  
    if (!title) {
      return NextResponse.json({ error: 'Name is required for update' }, { status: 400 });
    }
  
    try {
      const updatedList = await prisma.list.update({
        where: { id: params.id },
        data: { title }, 
      });
  
      return NextResponse.json(updatedList, { status: 200 });
    } catch (error) {
      console.error('Error updating list:', error);
      return NextResponse.json({ error: 'Error updating list' }, { status: 500 });
    }
  }