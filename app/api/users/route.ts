import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- Documentation Swagger ---
// POST /api/users
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Crée un nouvel utilisateur dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MERCHANT, CLIENT, DONATOR]
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Erreur de validation.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    // Validation basique
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Les champs nom, email, mot de passe et rôle sont requis.' }, { status: 400 });
    }

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: { name, email, password, role },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l\'utilisateur.' }, { status: 500 });
  }
}

// --- Documentation Swagger ---
// GET /api/users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Récupère la liste de tous les utilisateurs.
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 */
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des utilisateurs.' }, { status: 500 });
  }
}


