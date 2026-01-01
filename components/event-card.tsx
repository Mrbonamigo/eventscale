import Image from "next/image";
import Link from "next/link";

// 1. THE CONTRACT (Interface)
interface EventCardProps {
    title: string;
    date: string;
    location: string;
    price: string;
    imageUrl: string;
}

// 2. THE COMPONENT
export function EventCard({ title, date, location, price, imageUrl }: EventCardProps) {
    return (
        // Added 'max-w-sm' to limit card width and 'mx-auto' to center it.
        // This prevents the card (and image) from stretching too much.
        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] max-w-sm mx-auto w-full">

            {/* Part 1: The Image */}
            {/* - aspect-square: Forces a perfect square shape (1:1 ratio).
                - w-full: Fills the width of the card (which is now limited).
                - object-cover: Ensures the image covers the square without distortion.
            */}
            <div className="relative aspect-square w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Part 2: The Information */}
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

        </div>
    );
}