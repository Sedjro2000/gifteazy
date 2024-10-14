import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.filter.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Filtre supprimé avec succès' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Échec de la suppression du filtre' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { name, type, values, categoryIds } = await req.json();

    try {
        const updatedFilter = await prisma.filter.update({
            where: { id: params.id },
            data: {
                name,
                type,
                values,
                categories: {
                    set: categoryIds.map((id: string) => ({ id })),  // Met à jour les relations avec les catégories
                },
            },
        });

        return NextResponse.json(updatedFilter);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Échec de la mise à jour du filtre' }, { status: 500 });
    }
}
