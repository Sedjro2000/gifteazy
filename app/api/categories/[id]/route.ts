import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Opérations sur les catégories
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Récupère une catégorie par son ID.
 *     description: Renvoie les détails d'une catégorie avec ses sous-catégories.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à récupérer.
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Catégorie non trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur lors de la récupération de la catégorie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { children: true }, 
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("Error details: ", error);
    return NextResponse.json({ error: error.message || 'Failed to fetch category' }, { status: 500 });
  }
  
}

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Met à jour une catégorie par son ID.
 *     description: Met à jour le nom, la description et le parent d'une catégorie.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdate'
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erreur lors de la mise à jour de la catégorie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description, parentId } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, description, parentId },
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error("Error details: ", error);
    return NextResponse.json({ error: error.message || 'Failed to update category' }, { status: 500 });
  }
  
}

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Supprime une catégorie par son ID.
 *     description: Supprime la catégorie spécifiée.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à supprimer.
 *     responses:
 *       204:
 *         description: Catégorie supprimée avec succès.
 *       500:
 *         description: Erreur lors de la suppression de la catégorie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  

  try {
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 204 });
  } catch (error: any) {
    console.error("Error details: ", error);
    return NextResponse.json({ error: error.message || 'Failed to delete category' }, { status: 500 });
  }
  
}
