import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Récupère toutes les catégories.
 *     description: Renvoie la liste des catégories avec leurs sous-catégories associées.
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Électronique"
 *                   children:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *       404:
 *         description: Aucune catégorie trouvée.
 *       500:
 *         description: Erreur lors de la récupération des catégories.
 */
export async function GET () {
    try {
        const categories = await prisma.category.findMany({
            include: { children: true },
        });

        if (categories.length === 0) {
            return NextResponse.json({ message: 'Aucune catégorie trouvée.' });
        }
        console.log(categories)
        return NextResponse.json(categories);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch categories' });
    }
}

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crée une nouvelle catégorie.
 *     description: Ajoute une nouvelle catégorie à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouveau produit"
 *               description:
 *                 type: string
 *                 example: "Une description de la nouvelle catégorie"
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès.
 *       500:
 *         description: Erreur lors de la création de la catégorie.
 */
export async function POST(req: NextRequest) {
    const { name, description } = await req.json();

    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                description,
            },
        });
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create category' });
    }
}
