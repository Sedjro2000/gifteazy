import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const filters = await req.json(); // attend un tableau de filtre 

    try {
        
        const category = await prisma.category.findUnique({
            where: { id: params.id },
        });

        console.log("trouvé:",category)

        if (!category) {
            return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 });
        }

        const newFilters = await Promise.all(filters.map((filter: { name: string; type: string; values: string[] }) => {
            return prisma.filter.create({
                data: {
                    name: filter.name,
                    type: filter.type,
                    values: filter.values,
                    categories: { 
                        connect: { id: params.id }, 
                    },
                },
            });
        }));

        return NextResponse.json(newFilters, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Échec de la création des filtres pour la catégorie' }, { status: 500 });
    }
}
