import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";

// 1. Data structure interface
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    price: string;
    imageUrl: string;
    category: string;
}

// Helper function to map Database rows to our App Interface
function mapDatabaseEventToAppEvent(dbEvent: typeof events.$inferSelect): Event {
    return {
        id: String(dbEvent.id),
        title: dbEvent.title,
        description: dbEvent.description || "Join us for this amazing event! More details coming soon.",
        // Formatting date to English standard
        date: new Date(dbEvent.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        location: dbEvent.location,
        price: "$100.00", // ⚠️ Temporary fixed price
        imageUrl: dbEvent.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        // 🔍 IMPORTANT: Ensure your DB schema has a 'category' field.
        // If it doesn't, the filter will only work with "All".
        category: (dbEvent as any).category || "All"
    };
}

// Fetch ALL events (Home Page)
export async function getAllEvents(): Promise<Event[]> {
    try {
        const dbResults = await db.select().from(events);
        return dbResults.map(mapDatabaseEventToAppEvent);
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

// Fetch SINGLE event by ID (Details Page)
export async function getEventById(id: string): Promise<Event | undefined> {
    try {
        const eventId = Number(id);

        if (isNaN(eventId)) return undefined;

        const result = await db
            .select()
            .from(events)
            .where(eq(events.id, eventId));

        if (result.length === 0) return undefined;

        return mapDatabaseEventToAppEvent(result[0]);
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        return undefined;
    }
}