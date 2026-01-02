"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface EventCardProps {
    title: string;
    date: string;
    location: string;
    imageUrl: string;
}

export function EventCard({ title, date, location, imageUrl }: EventCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // 1. Motion values for the mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 2. Smooth the movement with a spring physics
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // 3. Map mouse position to rotation degrees
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to card center (-0.5 to 0.5)
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(relativeX);
        y.set(relativeY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
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
            {/* Background Image with Zoom */}
            <motion.img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500 -z-10"
            />

            {/* Content Container */}
            <div className="flex flex-col justify-end h-full p-6 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent">
                <span className="text-purple-400 text-sm font-medium mb-2">{date}</span>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
                <p className="text-slate-400 text-sm">{location}</p>

                <motion.button className="mt-4 py-2 px-4 rounded-xl bg-purple-600/20 border border-purple-500/50 text-white font-bold uppercase text-[10px] tracking-[0.2em] group-hover:bg-purple-600 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
                    Get Tickets
                </motion.button>
            </div>
        </motion.div>
    );
}