import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/categories/{id}/children:
 *   get:
 *     summary: Récupère les sous-catégories d'une catégorie.
 *     description: Renvoie les sous-catégories liées à la catégorie spécifiée par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie parente.
 *     responses:
 *       200:
 *         description: Sous-catégories récupérées avec succès.
 *       500:
 *         description: Erreur lors de la récupération des sous-catégories.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const subCategories = await prisma.category.findMany({
      where: { parentId: id },
      include: { children: true }, 
    });

    return NextResponse.json(subCategories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sub-categories' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/categories/{id}/children:
 *   post:
 *     summary: Crée une nouvelle sous-catégorie.
 *     description: Ajoute une sous-catégorie sous une catégorie parente spécifiée par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie parente.
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
 *     responses:
 *       201:
 *         description: Sous-catégorie créée avec succès.
 *       500:
 *         description: Erreur lors de la création de la sous-catégorie.
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // ID de la catégorie parente
    const { name, description } = await req.json(); 

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
  
    try {
      const parentCategory = await prisma.category.findUnique({
        where: { id },
      });
  
      if (!parentCategory) {
        return NextResponse.json({ error: 'Parent category not found' }, { status: 404 });
      }

      const newCategory = await prisma.category.create({
        data: {
          name,
          description,
          parentId: id,
        },
      });
  
      return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
    }
}
