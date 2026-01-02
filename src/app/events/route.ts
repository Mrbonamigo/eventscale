import { NextResponse } from 'next/server';
import { db } from '@/src/db'; // Certifique-se que este caminho está certo no seu projeto
import { events } from '@/src/db/schema';

export async function GET() {
    // Buscamos todos os campos da tabela 'events'
    const allEvents = await db.select().from(events);

    // Retornamos os dados em formato JSON com status 200 (OK)
    return NextResponse.json(allEvents);
}