/**
 * @swagger
 * /api/filters:
 *   post:
 *     summary: Créer un nouveau filtre et l'associer à des catégories
 *     tags:
 *       - Filters
 *     requestBody:
 *       description: Les informations du filtre à créer et les catégories auxquelles l'associer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Taille
 *                   type:
 *                     type: string
 *                     example: Sélection
 *                   values:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["S", "M", "L"]
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["cat1", "cat2"]
 *     responses:
 *       201:
 *         description: Filtre créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filter'
 *       500:
 *         description: Erreur lors de la création du filtre
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { filter, categoryIds } = await req.json();

  try {
    const newFilter = await prisma.filter.create({
      data: {
        name: filter.name,
        type: filter.type,
        values: filter.values,
        categories: {
          create: categoryIds.map((categoryId: string) => ({
            categoryId: categoryId,
          })),
        },
      },
    });

    return NextResponse.json(newFilter, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du filtre:", error);
    return NextResponse.json(
      { error: "Échec de l'ajout du filtre aux catégories" },
      { status: 500 }
    );
  }
}
