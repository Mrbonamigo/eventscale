import { getEventById } from "@/lib/data"; // 1. Import our function
import Link from "next/link";
import { notFound } from "next/navigation";

interface EventPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;

    // 2. Fetch real data using the URL ID
    const event = await getEventById(id);

    // 3. If the event doesn't exist (e.g., /events/potato), show 404 page
    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">

            {/* Image Banner */}
            <div className="relative h-96 w-full">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover"
                />
                {/* Gradient to ensure text readability over the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto -mt-32 relative z-10 px-4">

                <Link href="/" className="inline-block rounded-full bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors mb-6">
                    ← Back to Events
                </Link>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    {event.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-slate-300 mb-14">
                <span className="flex items-center gap-2">
                    📅 {event.date}
                </span>
                    <span className="flex items-center gap-2">
                    📍 {event.location}
                </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Column: Description */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-purple-400 mb-4">About the Event</h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    {/* Right Column: Price Card */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md h-fit">
                        <div className="text-sm text-slate-400 mb-1">Ticket Price</div>
                        <div className="text-3xl font-bold text-cyan-400 mb-6">{event.price}</div>

                        <button className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                            Secure Spot
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}