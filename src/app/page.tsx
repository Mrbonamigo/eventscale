import { Hero } from "@/components/hero";
import { EventSection } from "@/components/event-section";
import { EventFooter } from "@/components/event-footer";
import { getAllEvents } from "@/lib/data";

interface HomeProps {
    // In Next.js 15+, searchParams is a Promise
    searchParams: Promise<{
        category?: string;
        query?: string; // Added query parameter
    }>;
}

export default async function Home({ searchParams }: HomeProps) {
    // 1. Await the search parameters from the URL
    const { category, query } = await searchParams;

    // 2. Fetch events directly from the database with active filters
    // This replaces the manual .filter() we had before
    const filteredEvents = await getAllEvents(category, query);

    // 3. Define the featured event (usually the first one found)
    // If no events match the search, we can fall back to the first general event
    const featuredEvent = filteredEvents[0] || (await getAllEvents())[0];

    return (
        <main className="min-h-screen bg-black">
            {/* Display the main banner with a highlight event */}
            <Hero featuredEvent={featuredEvent} />

            {/* Pass the server-filtered events to the grid section */}
            <EventSection initialEvents={filteredEvents} />

            <EventFooter />
        </main>
    );
}