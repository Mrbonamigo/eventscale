"use client";

import { EventCard } from "./event-card";
import { Event } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";

interface EventGridProps {
    events: Event[];
}

export function EventGrid({ events }: EventGridProps) {
    const isEmpty = events.length === 0;

    return (
        <div className="relative w-full min-h-[400px]">
            <AnimatePresence mode="popLayout">
                {isEmpty ? (
                    /* --- ESTADO VAZIO (EMPTY STATE) --- */
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative flex flex-col items-center justify-center py-20 px-8 text-center rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-xl shadow-2xl shadow-purple-500/20 transform-gpu"
                    >
                        {/* Brilho decorativo atrás da lupa */}
                        <div className="p-4 rounded-full bg-purple-500/10 mb-6 ring-1 ring-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            <SearchX className="w-12 h-12 text-purple-500" />
                        </div>

                        <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
                            No events found
                        </h3>
                        <p className="text-slate-400 max-w-xs leading-relaxed">
                            We couldn't find any events in this category. How about exploring other options? 🚀
                        </p>
                    </motion.div>
                ) : (
                    /* --- GRID DE EVENTOS --- */
                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event, i) => (
                            <motion.div
                                layout
                                key={event.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: i * 0.1
                                }}
                            >
                                <EventCard
                                    id={event.id}
                                    title={event.title}
                                    date={event.date}
                                    location={event.location}
                                    price={event.price}
                                    imageUrl={event.imageUrl}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}