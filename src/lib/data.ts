import { db } from "@/db";
import { events, seats } from "@/db/schema";
import { eq, ilike, or, and, asc, SQL } from "drizzle-orm"; // Added 'asc' for sorting

/**
 * Interface representing the event structure used across the application.
 */
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

/**
 * Maps raw database rows to our standardized Event interface.
 * Handles date formatting and default values for missing data.
 */
function mapDatabaseEventToAppEvent(dbEvent: typeof events.$inferSelect): Event {
    return {
        id: String(dbEvent.id),
        title: dbEvent.title,
        description: dbEvent.description || "Join us for this amazing event! More details coming soon.",
        date: new Date(dbEvent.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        location: dbEvent.location,
        price: "$100.00", // ⚠️ Placeholder: Update once price logic is implemented in DB
        imageUrl: dbEvent.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        category: dbEvent.category || "All"
    };
}

/**
 * Fetches all events from the database with optional filtering by category and search term.
 * Performs filtering at the database level for better performance.
 */
export async function getAllEvents(category?: string, query?: string): Promise<Event[]> {
    try {
        const filters: SQL[] = [];

        // Apply category filter if it's not "All"
        if (category && category !== "All") {
            filters.push(eq(events.category, category));
        }

        // Apply search query filter (Case-insensitive search in title or description)
        if (query) {
            const searchTerm = `%${query}%`;
            filters.push(
                or(
                    ilike(events.title, searchTerm),
                    ilike(events.description, searchTerm)
                ) as SQL
            );
        }

        const dbResults = await db
            .select()
            .from(events)
            .where(filters.length > 0 ? and(...filters) : undefined);

        return dbResults.map(mapDatabaseEventToAppEvent);
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

/**
 * Fetches a single event by its unique numeric ID.
 */
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

/**
 * Fetches all seats associated with a specific event ID.
 * Returns information about availability and seat numbering.
 */
export async function getSeatsByEventId(eventId: string) {
    try {
        const id = Number(eventId);
        if (isNaN(id)) {
            console.error("Invalid event ID provided to getSeatsByEventId");
            return [];
        }

        // Fetching seats belonging to the specific event
        // We order by ID to ensure the grid layout remains stable after updates
        const eventSeats = await db
            .select()
            .from(seats)
            .where(eq(seats.eventId, id))
            .orderBy(asc(seats.id)); // <--- FIXED: Added sorting here

        return eventSeats;
    } catch (error) {
        console.error("Error fetching seats:", error);
        return [];
    }
}