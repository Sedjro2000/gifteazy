// app/test-connection/route.ts

/**
 * @swagger
 * /api/test-connection:
 *   get:
 *     summary: Test MongoDB connection
 *     description: Creates a test user in MongoDB.
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: testuser@example.com
 *                     username:
 *                       type: string
 *                       example: testuser
 *       500:
 *         description: Error while creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error while creating user
 */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  console.log("Received a request to test MongoDB connection.");

  try {
    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        email: "testuser@example.com",
        username: "testuser",
        password: "testpassword",
      },
    });

    console.log("✅ User created successfully:", testUser);

    return NextResponse.json({ message: "User created successfully", user: testUser }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error while creating user:", error.message);
    return NextResponse.json({ message: "Error while creating user", error: error.message }, { status: 500 });
  }
}
