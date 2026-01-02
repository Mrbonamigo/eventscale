import Image from "next/image";
import Link from "next/link"; // STEP 1: Import the "Magic Portal" tool

// 1. THE CONTRACT (Interface)
interface EventCardProps {
    id: string;      // STEP 2: Add the "Address" (ID). The card needs to know where to go!
    title: string;
    date: string;
    location: string;
    price: string;
    imageUrl: string;
}

// 2. THE COMPONENT
// Don't forget to add 'id' here to the list of props the component receives
export function EventCard({ id, title, date, location, price, imageUrl }: EventCardProps) {
    return (
        // STEP 3: Create the Portal!
        // We wrap everything with Link.
        // href={`/events/${id}`} means: "Take me to house number [id]"
        <Link href={`/events/${id}`} className="block group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] max-w-sm mx-auto w-full">

            {/* Part 1: The Image */}
            <div className="relative aspect-square w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Part 2: The Info */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">{date} • {location}</p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-cyan-400">{price}</span>
                    <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-purple-600 transition-colors">
                        Buy Ticket
                    </button>
                </div>
            </div>

        </Link>
    );
}