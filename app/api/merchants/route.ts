import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(); 
  
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    console.log ("Non autorisé")
  }

  const { storeName, address, phoneNumber, taxIdentificationNumber, userId } = await req.json(); 
 
 if (!storeName || !userId) {
  return NextResponse.json({ error: 'Store name and user ID are required.' }, { status: 400 });
}


  if (!storeName || !address || !phoneNumber || !taxIdentificationNumber) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
  }


  try {
    const merchant = await prisma.merchant.create({
      data: {
        userId: userId, 
        storeName,
        address,
        phoneNumber,
        taxIdentificationNumber,
      },
    });

  
   const updateUser =  await prisma.user.update({
      where: { id: userId }, 
      data: { role: 'MERCHANT' }, 
    });
     console.log(updateUser)

    return NextResponse.json(merchant, { status: 201 }); 
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ error: 'Une erreur est survenue lors de la création du marchand.' }, { status: 500 });
  }
}
