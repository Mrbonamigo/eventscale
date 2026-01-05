import { db } from "@/db";
import { events, seats } from "@/db/schema";
import { eq, ilike, or, and, asc, SQL } from "drizzle-orm";

/**
 * Interface representing the event structure used across the application.
 * Matches the props expected by the EventCard component.
 */
export interface Event {
    id: number; // Changed to number to match DB and EventCard props
    title: string;
    description: string;
    date: string; // ISO String is safer for hydration than formatted string
    location: string;
    price: string;
    imageUrl: string;
    category: string;
}

/**
 * Maps raw database rows to our standardized Event interface.
 */
function mapDatabaseEventToAppEvent(dbEvent: typeof events.$inferSelect): Event {
    return {
        id: dbEvent.id, // Keep as number
        title: dbEvent.title,
        description: dbEvent.description || "Join us for this amazing event! More details coming soon.",

        // CRITICAL FIX:
        // We use .toISOString() to ensure the date is passed in a standard format (YYYY-MM-DD...)
        // This prevents "Invalid Date" errors on the client side.
        date: new Date(dbEvent.date).toISOString(),

        location: dbEvent.location,
        price: "$100.00", // Placeholder until DB schema update
        imageUrl: dbEvent.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        category: dbEvent.category || "All"
    };
}

/**
 * Fetches all events from the database with optional filtering.
 */
export async function getAllEvents(category?: string, query?: string): Promise<Event[]> {
    try {
        const filters: SQL[] = [];

        // 1. Apply category filter
        if (category && category !== "All") {
            filters.push(eq(events.category, category));
        }

        // 2. Apply search query filter
        if (query) {
            const searchTerm = `%${query}%`;
            filters.push(
                or(
                    ilike(events.title, searchTerm),
                    ilike(events.description, searchTerm),
                    ilike(events.location, searchTerm) // Added location search
                ) as SQL
            );
        }

        const dbResults = await db
            .select()
            .from(events)
            .where(filters.length > 0 ? and(...filters) : undefined)
            .orderBy(asc(events.date)); // <--- CRITICAL: Sort by nearest date

        return dbResults.map(mapDatabaseEventToAppEvent);
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

/**
 * Fetches a single event by its unique numeric ID.
 */
export async function getEventById(id: string | number): Promise<Event | undefined> {
    try {
        const eventId = Number(id);
        if (isNaN(eventId)) return undefined;

        const result = await db
            .select()
            .from(events)
            .where(eq(events.id, eventId))
            .limit(1); // Good practice to limit to 1

        if (result.length === 0) return undefined;

        return mapDatabaseEventToAppEvent(result[0]);
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        return undefined;
    }
}

/**
 * Fetches all seats associated with a specific event ID.
 */
export async function getSeatsByEventId(eventId: string) {
    try {
        const id = Number(eventId);
        if (isNaN(id)) {
            console.error("Invalid event ID provided to getSeatsByEventId");
            return [];
        }

        const eventSeats = await db
            .select()
            .from(seats)
            .where(eq(seats.eventId, id))
            .orderBy(asc(seats.id));

        return eventSeats;
    } catch (error) {
        console.error("Error fetching seats:", error);
        return [];
    }
}