import { getEventById, getSeatsByEventId } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EventBooking } from "@/components/event-booking";
import { CalendarIcon, MapPinIcon } from "lucide-react";

interface EventPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;

    // Parallel fetching
    const [event, seats] = await Promise.all([
        getEventById(id),
        getSeatsByEventId(id)
    ]);

    if (!event) {
        notFound();
    }

    // Date formatting
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Hero Image */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            {/* Main Content Container - Centered and Stacked */}
            <div className="container mx-auto -mt-32 relative z-10 px-6 max-w-4xl">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 backdrop-blur-md px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all border border-white/10 mb-8"
                >
                    ← Back to Events
                </Link>

                {/* 1. Event Header Info */}
                <div className="mb-12">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-purple-300 uppercase bg-purple-500/20 rounded-full border border-purple-500/20">
                        {event.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-300 text-lg">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-purple-400" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 text-purple-400" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>

                {/* 2. Description Section (ABOVE seats) */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">
                        About the Event
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        {event.description}
                    </p>
                </section>

                {/* 3. Booking Section (BELOW description) */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-green-500 pl-4">
                        Select Your Seats
                    </h2>
                    {/* This component handles the seat map and booking logic */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                        <EventBooking
                            eventPrice={event.price}
                            seats={seats}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}