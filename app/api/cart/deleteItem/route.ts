import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function DELETE(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
        }

        // Supprimer l'article du panier
        const cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
        });

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        const cartItem = await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                productId: productId,
            },
        });

        if (!cartItem.count) {
            return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
