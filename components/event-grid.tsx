import { EventCard } from "./event-card";
import { Event } from "@/lib/data"; // 1. Import the type

// 2. The interface we discussed
interface EventGridProps {
    events: Event[];
}

// 3. Simple component (no more 'async')
export function EventGrid({ events }: EventGridProps) {
    return (
        // Note: We removed the <section> and <h2> from here
        // because they moved to the EventSection parent!
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    price={event.price}
                    imageUrl={event.imageUrl}
                />
            ))}
        </div>
    );
}