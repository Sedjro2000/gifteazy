import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Retourne un message de salutation
 *     description: Endpoint qui retourne un message "Hello, World!".
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, World!
 */

export async function GET(req: NextRequest) {
  const response = { message: 'Hello, World!' };
  return NextResponse.json(response, { status: 200 });
}
