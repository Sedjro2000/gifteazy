/**
 * @swagger
 * /api/filters/categories/{id}:
 *   get:
 *     summary: Récupérer les filtres associés aux catégories par ID
 *     tags:
 *       - Filters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Liste des IDs des catégories, séparés par des virgules
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtres récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 'filter1'
 *                   name:
 *                     type: string
 *                     example: 'Taille'
 *                   type:
 *                     type: string
 *                     example: 'Sélection'
 *                   values:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ['S', 'M', 'L']
 *       500:
 *         description: Échec de la récupération des filtres pour les catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Échec de la récupération des filtres pour les catégories'
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const categoryIds = id.split(',');
        console.log('Category IDs:', categoryIds);
        const filters = await prisma.filter.findMany({
            where: {
                categories: {
                    some: {
                        categoryId: { in: categoryIds },
                    },
                },
            },
            distinct: ['name'], 
        });
        
        console.log('Filters found:', filters);

        return NextResponse.json(filters);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Échec de la récupération des filtres pour les catégories' }, { status: 500 });
    }
}
