import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/filters/category/{id}:
 *   get:
 *     summary: Récupère les filtres pour une catégorie donnée.
 *     description: Renvoie une liste de filtres associés à une catégorie spécifique.
 *     tags:
 *       - Filters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie pour laquelle récupérer les filtres.
 *     responses:
 *       200:
 *         description: Filtres récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filter'
 *       404:
 *         description: Catégorie non trouvée.
 *       500:
 *         description: Erreur lors de la récupération des filtres.
 */


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // L'ID des catégories sélectionnées
    
    try {
        // Si id représente plusieurs catégories, tu pourrais les séparer par des virgules par exemple.
        const categoryIds = id.split(',');

        // Récupérer les filtres pour toutes les catégories
        const filters = await prisma.filter.findMany({
            where: {
                categoryId: {
                    in: categoryIds
                }
            },
            distinct: ['name'], // 'name' doit correspondre à la clé pour laquelle tu veux éviter les doublons
        });

        // Optionnel : Si tu veux plus de contrôle sur les champs pour lesquels tu veux éviter les doublons
        // Tu pourrais aussi utiliser lodash ou une fonction pour dédupliquer par nom, par exemple.

        return NextResponse.json(filters);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch filters for this category' }, { status: 500 });
    }
}


/**
 * @swagger
 * /api/filters/category/{id}:
 *   delete:
 *     summary: Supprime un filtre par son ID.
 *     description: Supprime un filtre spécifique associé à une catégorie.
 *     tags:
 *       - Filters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du filtre à supprimer.
 *     responses:
 *       200:
 *         description: Filtre supprimé avec succès.
 *       500:
 *         description: Erreur lors de la suppression du filtre.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      await prisma.filter.delete({
        where: { id: params.id }
      });
      return NextResponse.json({ message: 'Filter deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete filter' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/filters/category/{id}:
 *   put:
 *     summary: Met à jour un filtre par son ID.
 *     description: Met à jour un filtre associé à une catégorie.
 *     tags:
 *       - Filters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du filtre à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilterUpdate'
 *     responses:
 *       200:
 *         description: Filtre mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filter'
 *       500:
 *         description: Erreur lors de la mise à jour du filtre.
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { name, type, values } = await req.json();
    try {
      const updatedFilter = await prisma.filter.update({
        where: { id: params.id },
        data: {
          name,
          type,
          values,
        }
      });
      return NextResponse.json(updatedFilter);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update filter' }, { status: 500 });
    }
}
