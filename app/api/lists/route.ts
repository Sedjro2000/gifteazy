import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'; 
import { getSession } from 'next-auth/react'; 

export async function POST(req: NextRequest) {
  /*const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }*/

    try {
        const body = await req.json();
        const { title } = body;


        console.log('Request Body:', body);

    
        // Vérification si le champ 'title' est bien présent dans la requête
        if (!title) {
          return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }
    
        // Création de la nouvelle liste avec un userId fictif pour l'instant
        const list = await prisma.list.create({
          data: {
            title,
            userId: '66edb9feff8fb4524ddf42bf', // Utilise l'ID utilisateur une fois l'authentification activée
          },
        });
    
        return NextResponse.json(list, { status: 201 });
      } catch (error) {
        console.error('Error creating list:', error);
        return NextResponse.json({ error: 'Failed to create list' }, { status: 500 });
      }
}


export async function GET(req: NextRequest) {
   /* const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }*/
  
 try{
  const lists = await prisma.list.findMany({
    where: { userId: '66edb9feff8fb4524ddf42bf'/*session.user.id*/ },
    include: {
      listItems: true, 
    },
  });

  return NextResponse.json(lists);
 }catch(error){
  console.error('Error creating list:', error);
  return NextResponse.json({ error: 'Failed to create list' }, { status: 500 });
 }
  }
  