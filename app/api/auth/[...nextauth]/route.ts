/**
 * @swagger
 * components:
 *   schemas:
 *     AuthOptions:
 *       type: object
 *       properties:
 *         adapter:
 *           type: string
 *           description: Adapter for Prisma integration.
 *         providers:
 *           type: array
 *           items:
 *             type: string
 *           description: Authentication providers (e.g., Credentials, Google).
 *         pages:
 *           type: object
 *           description: Custom sign-in page.
 *         session:
 *           type: object
 *           description: Session strategy.
 *         callbacks:
 *           type: object
 *           description: Custom callback functions for JWT and sessions.
 */

/**
 * @swagger
 * /api/auth/callback/credentials:
 *   post:
 *     summary: Authenticate user credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "you@example.com"
 *               password:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized (invalid credentials)
 */




import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions = {
    adapter : PrismaAdapter(prisma),
    providers :[
        Credentials(
            {
                credentials: {
                    email : { label : "Email", type : "text", placeholder: "you@example.com"},
                    password : { label: "Password", type: "password"}
                },
                async authorize(credentials) {
                    console.log ( "Authorize called with credentials:", credentials)
                      // Recherche de l'utilisateur dans la base de données
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                    
                });
                console.log("User found:", user);
                if (!user) {
                    console.error("No user found with this email");
                    throw new Error("No user found with this email");
                }
              // Comparaison des mots de passe
              const isPasswordValid = await bcrypt.compare(credentials!.password, user.password);
              console.log("Password valid:", isPasswordValid);
              
              if ( !isPasswordValid) {
                console.log( "Incorrect Password");
                throw new Error ("Incorrect password");

              }
              console.log("Authentification succesful, returning user:", {id: user.id, name: user.name, email : user.email});
              return { id: user.id, name: user.name, email : user.email};
            
                },
            }
        )
    ],
    pages : {
        signIn: "/auht/signin",
    },
    session : {
        strategy : 'jwt ' as 'jwt',
    },
    
    callbacks : {
        async session( { session, token } : { session : any, token: any}){
            console.log ("Session callback with session :", session, "and token :", token);
            if (token && session.user) {
                session.user.id = token.id;
            }
            console.log("Updated session:", session);
            return session;
        },
        async jwt({ token, user }: { token: any, user: any }) {
            console.log("JWT callback called with token:", token, "and user:", user);
            if (user) {
                token.id = user.id;
            }
            console.log("Updated token:", token);
            return token;
        },
    }
}

const handler = NextAuth(authOptions);
export { handler as GET , handler as POST }