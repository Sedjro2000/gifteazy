import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma'; 

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.sub) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
 
  

  try {
    const { cartItems, amount,  } = await req.json();

    const orderItems = cartItems.map((item: { id: any; }) => ({
        cartItemId: item.id, // Assure-toi que c'est l'ID de l'article du panier
        // Tu peux ajouter d'autres propriétés si nécessaire
      }));


    console.log('Received cart items:', cartItems);
    console.log('Order amount:', amount);


    

    const newOrder = await prisma.order.create({
        data: {
          donatorId: token.sub,  
          amount,
          paymentStatus: 'PENDING',
          deliveryStatus: 'PENDING',
          orderListItems: {
            create: orderItems.map(item => ({
              cartItemId: item.cartItemId,
            }))
          }
        },
      });
      
      
  console.log('Order data:', {
    donatorId: "66edb9feff8fb4524ddf42bf",
    amount,
    orderListItems: orderItems,
  });
  

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order', details: error }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
    if (!token || !token.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const orders = await prisma.order.findMany({
        where: { donatorId: token.sub },
        include: {
          orderListItems: true, 
        },
      });
  
      return NextResponse.json(orders, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch orders', details: error }, { status: 500 });
    }
  }
  