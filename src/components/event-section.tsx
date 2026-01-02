"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { EventGrid } from "./event-grid";
import { SearchBar } from "./search-bar";
import { CategoryFilter } from "./category-filter";
import { Event } from "@/lib/data";

interface EventSectionProps {
    initialEvents: Event[];
}

export function EventSection({ initialEvents }: EventSectionProps) {
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>(initialEvents);

    // 1. Extract search and category from the URL
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "All";

    // 2. Optimized filtering logic
    const filteredEvents = useMemo(() => {
        let currentFiltered = initialEvents;

        // Filter by Search Query (Title or Location)
        if (searchQuery) {
            currentFiltered = currentFiltered.filter((event) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by Category
        if (categoryQuery !== "All") {
            currentFiltered = currentFiltered.filter((event) =>
                event.category.toLowerCase() === categoryQuery.toLowerCase()
            );
        }

        return currentFiltered;
    }, [initialEvents, searchQuery, categoryQuery]);

    // 3. Sync local state with filtered results
    useEffect(() => {
        setEvents(filteredEvents);
    }, [filteredEvents]);

    return (
        <section className="relative flex flex-col gap-12 w-full max-w-7xl mx-auto py-12 px-4">

            {/* STICKY HEADER: Search + Category Filters 📌 */}
            <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl py-8 flex flex-col gap-8 border-b border-white/5">

                {/* Search Bar Container */}
                <div className="w-full max-w-2xl mx-auto">
                    <SearchBar />
                </div>

                {/* Category Filter Container */}
                <div className="flex justify-center">
                    <CategoryFilter />
                </div>
            </div>

            {/* EVENTS GRID 📅 */}
            <div className="relative z-10 min-h-[400px]">
                {events.length > 0 ? (
                    <EventGrid events={events} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg italic">
                            No events found matching your search.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}