import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


/**
 * @swagger
 * /api/filters/{id}:
 *   delete:
 *     summary: Supprimer un filtre par ID
 *     tags:
 *       - Filters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du filtre à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtre supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Filtre supprimé avec succès'
 *       500:
 *         description: Échec de la suppression du filtre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Échec de la suppression du filtre'
 */




export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.filter.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Filtre supprimé avec succès' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Échec de la suppression du filtre' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/filters/{id}:
 *   put:
 *     summary: Mettre à jour un filtre par ID
 *     tags:
 *       - Filters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du filtre à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Les informations du filtre à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Taille'
 *               type:
 *                 type: string
 *                 example: 'Sélection'
 *               values:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ['S', 'M', 'L']
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ['cat1', 'cat2']
 *     responses:
 *       200:
 *         description: Filtre mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 'filter1'
 *                 name:
 *                   type: string
 *                   example: 'Taille'
 *                 type:
 *                   type: string
 *                   example: 'Sélection'
 *                 values:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['S', 'M', 'L']
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['cat1', 'cat2']
 *       500:
 *         description: Échec de la mise à jour du filtre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Échec de la mise à jour du filtre'
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { name, type, values, categoryIds } = await req.json();

    try {
        const updatedFilter = await prisma.filter.update({
            where: { id: params.id },
            data: {
                name,
                type,
                values,
                categories: {
                    set: categoryIds.map((id: string) => ({ id })),  // Met à jour les relations avec les catégories
                },
            },
        });

        return NextResponse.json(updatedFilter);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Échec de la mise à jour du filtre' }, { status: 500 });
    }
}
