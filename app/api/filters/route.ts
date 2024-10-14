import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
        console.error('Erreur lors de la création du filtre:', error);
        return NextResponse.json({ error: 'Échec de l\'ajout du filtre aux catégories' }, { status: 500 });
    }
}
