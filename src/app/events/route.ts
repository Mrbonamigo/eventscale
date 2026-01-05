import { NextResponse } from 'next/server';
import { db } from '@/db';
import { events } from '@/db/schema';
import { asc } from 'drizzle-orm';

// Forces the route to be dynamic (avoids static caching issues)
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch all events ordered by date (ascending: nearest date first)
        const allEvents = await db
            .select()
            .from(events)
            .orderBy(asc(events.date));

        return NextResponse.json(allEvents);
    } catch (error) {
        console.error("Error in events API:", error);
        return NextResponse.json(
            { error: "Internal server error fetching events" },
            { status: 500 }
        );
    }
}