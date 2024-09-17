/**
 * Swagger documentation
 * 
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     description: Retourne une liste de tous les produits disponibles dans la base de données.
 *     responses:
 *       200:
 *         description: Liste de produits récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des produits
 *   post:
 *     summary: Créer un nouveau produit
 *     description: Permet de créer un nouveau produit en envoyant les données du produit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               stock:
 *                 type: integer
 *               merchantId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       500:
 *         description: Erreur lors de la création du produit
 *   put:
 *     summary: Mettre à jour un produit
 *     description: Met à jour un produit existant selon son ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       500:
 *         description: Erreur lors de la mise à jour du produit
 *   delete:
 *     summary: Supprimer un produit
 *     description: Supprime un produit selon son ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       500:
 *         description: Erreur lors de la suppression du produit
 */



import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, imageUrl, stock, merchantId } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        stock,
        merchantId,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, price, imageUrl, stock } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
        stock,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}


