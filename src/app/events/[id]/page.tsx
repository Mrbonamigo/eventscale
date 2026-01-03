import { getEventById, getSeatsByEventId } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventBooking } from "@/components/event-booking";

interface EventPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EventPage({ params }: EventPageProps) {
    // Awaiting the dynamic route parameters
    const { id } = await params;

    // 1. Parallel data fetching: Optimization to reduce Waterfall loading
    const [event, seats] = await Promise.all([
        getEventById(id),
        getSeatsByEventId(id)
    ]);

    // 2. Security Check: If the ID doesn't match any event, return 404
    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Visual Header with Event Image */}
            <div className="relative h-96 w-full">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto -mt-32 relative z-10 px-4">
                <Link
                    href="/"
                    className="inline-block rounded-full bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors mb-6"
                >
                    ← Back to Events
                </Link>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                    {event.title}
                </h1>

                {/* Event Metadata (Date and Location) */}
                <div className="flex flex-wrap items-center gap-6 text-slate-300 mb-14">
                    <span className="flex items-center gap-2">📅 {event.date}</span>
                    <span className="flex items-center gap-2">📍 {event.location}</span>
                </div>

                <div className="space-y-12">
                    {/* Event Description Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-purple-400 mb-4 tracking-tight">About the Event</h2>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-4xl">
                            {event.description}
                        </p>
                    </section>

                    {/* 3. Interactive Booking Section: Unifies Seat Map and Price Card */}
                    {/* This client-side component manages selection and checkout state */}
                    <EventBooking
                        eventPrice={event.price}
                        seats={seats}
                    />
                </div>
            </div>
        </div>
    );
}