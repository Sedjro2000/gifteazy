import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";



export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Récupérer le panier de l'utilisateur
        const cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
            include: {
                items: {
                    include: { product: true }, // Inclure les informations sur le produit si nécessaire
                },
            },
        });

        if (!cart) {
            return NextResponse.json({ items: [] }); // Si aucun panier n'existe, retourner un panier vide
        }

        return NextResponse.json({ items: cart.items }); // Retourner les items du panier
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}



/*export async function POST(req: NextRequest) {
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
            include: {
                items: {
                    include: {
                        product: true,  // Inclure les détails du produit
                    },
                },
            },
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
                include: {
                    items: {
                        include: {
                            product: true,  // Inclure les détails du produit
                        },
                    },
                },
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

        // Récupérer à nouveau le panier avec les produits après la mise à jour
        cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
            include: {
                items: {
                    include: {
                        product: true,  // Inclure les détails du produit
                    },
                },
            },
        });

        return NextResponse.json({ message: 'Item added to cart successfully', cart });

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
}*/
export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId, quantity } = await req.json();

        if (!productId || !quantity || quantity <= 0) {
            return NextResponse.json({ error: 'Invalid product or quantity' }, { status: 400 });
        }

        // Récupérer le panier de l'utilisateur
        let cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
            include: {
                items: {
                    include: {
                        product: true,  // Inclure les détails du produit
                    },
                },
            },
        });

        // Si le panier n'existe pas, créer un nouveau panier
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: token.sub,
                    items: {
                        create: [{ productId, quantity }],
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,  // Inclure les détails du produit
                        },
                    },
                },
            });
        } else {
            // Utiliser upsert pour mettre à jour ou créer l'article dans le panier
            await prisma.cartItem.upsert({
                where: {
                    cartId_productId: { cartId: cart.id, productId },  // Unique key dans Prisma
                },
                update: {
                    quantity: { increment: quantity },  // Ajouter à la quantité existante
                },
                create: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }

        // Récupérer le panier après la mise à jour
        cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
            include: {
                items: {
                    include: {
                        product: true,  // Inclure les détails du produit
                    },
                },
            },
        });

        return NextResponse.json({ message: 'Item added to cart successfully', cart });

    } catch (error) {
        console.error('Error while adding item to cart:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId, quantity } = await req.json();

        if (!productId || quantity === undefined || quantity < 0) {
            return NextResponse.json({ error: 'Invalid product or quantity' }, { status: 400 });
        }

        // Récupérer le panier de l'utilisateur
        const cart = await prisma.cart.findFirst({
            where: { userId: token.sub },
            include: { items: true },
        });

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        // Mettre à jour la quantité de l'article dans le panier
        const updatedItem = await prisma.cartItem.update({
            where: {
                cartId_productId: { cartId: cart.id, productId },
            },
            data: {
                quantity: quantity,  // Mettre à jour avec la nouvelle quantité
            },
        });

        return NextResponse.json({ message: 'Item quantity updated successfully', updatedItem });
    } catch (error) {
        console.error('Error while updating item quantity:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

