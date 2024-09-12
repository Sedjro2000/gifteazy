import { PrismaClient } from '@prisma/client';

// Crée une instance de PrismaClient
const prisma = new PrismaClient();

// Affiche un message dans la console lors de la connexion à la base de données
prisma.$connect()
  .then(() => console.log("✅ Successfully connected to MongoDB with Prisma"))
  .catch((error) => console.error("❌ Failed to connect to MongoDB:", error));

export default prisma;
