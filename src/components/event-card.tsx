"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// 1. Define props separately to match the spread operator usage {...event} in the parent
interface EventCardProps {
    id: number;
    title: string;
    date: string | Date;
    location: string;
    imageUrl: string;
    category: string; // Replaced 'price' with 'category' to match DB schema
}

// 2. Destructure props directly here to avoid the "reading 'date' of undefined" error
export function EventCard({ id, title, date, location, imageUrl, category }: EventCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // --- 3D Tilt Logic ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(relativeX);
        y.set(relativeY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // --- Safe Date Formatting ---
    // Handle both string (ISO) and Date objects
    const dateObj = new Date(date);
    const day = dateObj.getDate();

    // Check if date is valid before formatting
    const isDateValid = !isNaN(day);
    const displayDay = isDateValid ? day : "--";
    // Using 'en-US' since you requested English, but you can change to 'pt-BR'
    const displayMonth = isDateValid
        ? dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
        : "";

    return (
        <Link href={`/events/${id}`} className="block w-full h-full">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.02 }}
                className="group relative w-full h-[400px] rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-xl overflow-hidden cursor-pointer isolate"
            >
                {/* Background Image (Optimized) */}
                <div className="absolute inset-0 -z-10 h-full w-full">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Content Container */}
                <div className="flex flex-col justify-end h-full p-6 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent">
                    <div className="flex justify-between items-start mb-2">
                        {/* Date Badge */}
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-lg p-2 min-w-[50px]">
                            <span className="text-xl font-bold text-white leading-none">{displayDay}</span>
                            <span className="text-[10px] font-bold text-purple-400 uppercase leading-none mt-1">{displayMonth}</span>
                        </div>

                        {/* Category Badge */}
                        <span className="bg-purple-600/80 px-2 py-1 rounded text-xs text-white font-bold backdrop-blur-md uppercase tracking-wider shadow-lg shadow-purple-900/20">
                            {category}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight line-clamp-2 drop-shadow-md">
                        {title}
                    </h3>

                    <p className="text-slate-300 text-sm flex items-center gap-1 opacity-90">
                        📍 {location}
                    </p>

                    <button className="mt-5 w-full py-3 px-4 rounded-xl bg-purple-600/20 border border-purple-500/50 text-white font-bold uppercase text-[10px] tracking-[0.2em] group-hover:bg-purple-600 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
                        View Details
                    </button>
                </div>
            </motion.div>
        </Link>
    );
}