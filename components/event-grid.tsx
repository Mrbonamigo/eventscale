import { EventCard } from "./event-card";

// 1. DUMMY DATA
const EVENTS = [
    {
        id: "1",
        title: "Neon Cyber Party",
        date: "Aug 15, 2026",
        location: "Neo Tokyo Arena",
        price: "$150",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
    },
    {
        id: "2",
        title: "Synthwave Festival",
        date: "Sep 22, 2026",
        location: "Los Angeles, CA",
        price: "$200",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
    },
    {
        id: "3",
        title: "Tech Conference 2026",
        date: "Oct 05, 2026",
        location: "Berlin, Germany",
        price: "$500",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
    },
    {
        id: "4",
        title: "Gaming Championship",
        date: "Nov 12, 2026",
        location: "Seoul, South Korea",
        price: "$120",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
    },
    {
        id: "5",
        title: "AI Summit",
        date: "Dec 01, 2026",
        location: "San Francisco, CA",
        price: "$300",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
    },
    {
        id: "6",
        title: "Future Bass Night",
        date: "Jan 18, 2027",
        location: "London, UK",
        price: "$80",
        imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
    }
];

export function EventGrid() {
    return (
        <section className="container py-12 md:py-24">

            {/* Section Title */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                    Upcoming <span className="text-cyan-400">Events</span>
                </h2>
                <p className="mt-4 text-slate-400">
                    Secure your spot at the most anticipated events of the year.
                </p>
            </div>

            {/* THE GRID */}
            {/* Updated Grid Configuration:
          - Mobile (default): 1 column
          - Tablet (md): 2 columns
          - Desktop (lg): 4 columns (Changed from 3 to 4 to make cards smaller on laptops)
      */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {EVENTS.map((event) => (
                    <EventCard
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        price={event.price}
                        imageUrl={event.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
}