import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/categories/name/{name}:
 *   get:
 *     summary: Récupère une catégorie par son nom.
 *     description: Renvoie les détails d'une catégorie spécifique avec ses sous-catégories.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la catégorie à récupérer.
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès.
 *       404:
 *         description: Catégorie non trouvée.
 *       500:
 *         description: Erreur lors de la récupération de la catégorie.
 */
export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const { name } = params;

  try {
    const category = await prisma.category.findUnique({
      where: { name }, 
      include: { children: true }, 
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}
