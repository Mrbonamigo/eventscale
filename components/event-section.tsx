'use client';

import { useSearchParams } from 'next/navigation';
import { Event } from "@/lib/data";
import { SearchBar } from "./search-bar";
import { EventGrid } from "./event-grid";

interface EventSectionProps {
    initialEvents: Event[];
}

export function EventSection({ initialEvents }: EventSectionProps) {
    const searchParams = useSearchParams();

    // Pega o termo da URL (ex: ?query=rock)
    const query = searchParams.get('query')?.toLowerCase() || "";

    // Filtra os eventos baseados na URL
    const filteredEvents = initialEvents.filter((event) =>
        event.title.toLowerCase().includes(query)
    );

    return (
        <section className="container mx-auto px-4 py-20 w-full">
            <div className="max-w-md mx-auto mb-16">
                <SearchBar />
            </div>

            <div className="w-full">
                {filteredEvents.length > 0 ? (
                    <EventGrid events={filteredEvents} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-xl">
                            No events found for {query} 🔎
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}