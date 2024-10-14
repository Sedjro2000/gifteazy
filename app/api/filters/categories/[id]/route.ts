import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const categoryIds = id.split(',');
        console.log('Category IDs:', categoryIds);
        const filters = await prisma.filter.findMany({
            where: {
                categories: {
                    some: {
                        categoryId: { in: categoryIds },
                    },
                },
            },
            distinct: ['name'], 
        });
        
        console.log('Filters found:', filters);

        return NextResponse.json(filters);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Échec de la récupération des filtres pour les catégories' }, { status: 500 });
    }
}
