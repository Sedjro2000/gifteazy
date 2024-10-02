import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * tags:
 *   - name: Filters
 *     description: Opérations sur les filtres
 */

/**
 * @swagger
 * /api/filters:
 *   get:
 *     summary: Récupère tous les filtres disponibles.
 *     description: Renvoie une liste de tous les filtres.
 *     tags:
 *       - Filters
 *     responses:
 *       200:
 *         description: Liste des filtres récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filter'
 *       500:
 *         description: Erreur lors de la récupération des filtres.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(req: NextRequest) {
    try {
        const filters = await prisma.filter.findMany();
        return NextResponse.json(filters);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch filters' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/filters:
 *   post:
 *     summary: Crée un nouveau filtre.
 *     description: Ajoute un nouveau filtre avec un nom, un type et des valeurs.
 *     tags:
 *       - Filters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilterCreate'
 *     responses:
 *       201:
 *         description: Filtre créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filter'
 *       500:
 *         description: Erreur lors de la création du filtre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(req: NextRequest) {
    const { name, type, values, categoryId } = await req.json();
    try {
        const newFilter = await prisma.filter.create({
            data: {
                name,
                type,
                values,
                categoryId,
            },
        });
        return NextResponse.json(newFilter, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create filter' }, { status: 500 });
    }
}
