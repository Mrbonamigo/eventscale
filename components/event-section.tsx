"use client"; // This directive is crucial for client-side hooks like useSearchParams and useRouter

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { EventGrid } from "./event-grid"; // Assuming EventGrid is a separate component
import { SearchBar } from "./search-bar"; // Assuming SearchBar is a separate component
import { CategoryFilter } from "./category-filter"; // Import our new category filter component
import { Event } from "@/lib/data";
// Define the interface for your event data.
// It's critical that your actual event objects have a 'category' field.


interface EventSectionProps {
    initialEvents: Event[]; // Use the defined Event interface
}

export function EventSection({ initialEvents }: EventSectionProps) {
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>(initialEvents); // State to hold currently displayed events

    // Extract search query and category from the URL
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "All"; // Default to 'All' if no category is in the URL

    // Use useMemo for optimized filtering.
    // This hook will only re-run its function if its dependencies change.
    const filteredEvents = useMemo(() => {
        let currentFiltered = initialEvents;

        // 1. Filter by Search Query (if a search query exists)
        if (searchQuery) {
            currentFiltered = currentFiltered.filter((event) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Filter by Category Query (if a specific category is selected, i.e., not 'All')
        if (categoryQuery !== "All") {
            currentFiltered = currentFiltered.filter((event) =>
                event.category.toLowerCase() === categoryQuery.toLowerCase()
            );
        }

        return currentFiltered;
    }, [initialEvents, searchQuery, categoryQuery]); // Dependencies: re-filter when these values change

    // Update the local 'events' state whenever 'filteredEvents' changes
    useEffect(() => {
        setEvents(filteredEvents);
    }, [filteredEvents]);

    return (
        <section className="relative flex flex-col gap-12">
            {/* Contêiner do Filtro com Z-index alto */}
            <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md py-4">
                <CategoryFilter />
            </div>

            {/* Contêiner da Grid com Z-index baixo */}
            <div className="relative z-10 px-4">
                <EventGrid events={events} />
            </div>
        </section>
    );
}