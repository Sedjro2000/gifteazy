import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId, quantity } = await req.json();

        if (!productId || !quantity) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Récupérer le panier de l'utilisateur
        let cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
            include: { items: true }  // Assure que la propriété items soit toujours incluse
        });

        // Si le panier n'existe pas, créer un nouveau panier avec un item vide
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: token.sub,
                    items: {
                        create: [{ productId, quantity }],
                    },
                },
                include: { items: true },  // Inclure les items dans la réponse
            });
        } else {
            // Vérifier si l'article est déjà dans le panier
            const cartItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: productId,
                },
            });

            if (cartItem) {
                // Si l'article est déjà dans le panier, mettre à jour la quantité
                await prisma.cartItem.update({
                    where: { id: cartItem.id },
                    data: {
                        quantity: cartItem.quantity + quantity,
                    },
                });
            } else {
                // Ajouter l'article au panier
                await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: productId,
                        quantity: quantity,
                    },
                });
            }
        }

        return NextResponse.json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}



export async function DELETE(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Récupérer le panier de l'utilisateur
        const cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
        });

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        // Supprimer tous les articles du panier
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        return NextResponse.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
