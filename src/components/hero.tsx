"use client";

import Link from "next/link";
import { FeaturedCard } from "./FeaturedCard";

// Define the shape of our Event for TypeScript 🛡️
interface Event {
    title: string;
    date: string;
    location: string;
    imageUrl: string;
}

interface HeroProps {
    featuredEvent?: Event;
}

export function Hero({ featuredEvent }: HeroProps) {
    return (
        <section className="w-full flex flex-col items-center justify-center text-center gap-12 pb-16 pt-6 md:pt-20 px-4">
            {/* Text Content 📝 */}
            <div className="flex max-w-[980px] flex-col items-center gap-4">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl text-white">
                    The Future of <span className="text-purple-400">Live Events</span> <br />
                    is <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Secure and Scalable.
          </span>
                </h1>

                <p className="max-w-[700px] text-lg text-slate-400 md:text-xl">
                    Buy tickets for the biggest concerts and matches without crashes.
                    Powered by high-performance architecture.
                </p>
            </div>

            {/* Action Buttons 🖱️ */}
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/events"
                    className="rounded-full bg-purple-600 px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-700 transition-all"
                >
                    Browse Events
                </Link>

                <Link
                    href="/about"
                    className="rounded-full border border-slate-700 bg-slate-900/50 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all"
                >
                    Learn More
                </Link>
            </div>

            {/* Featured Card Section 🌟 */}
            {featuredEvent && (
                <div className="w-full max-w-[1100px] mt-8">
                    <FeaturedCard
                        title={featuredEvent.title}
                        date={featuredEvent.date}
                        location={featuredEvent.location}
                        imageUrl={featuredEvent.imageUrl}
                    />
                </div>
            )}
        </section>
    );
}