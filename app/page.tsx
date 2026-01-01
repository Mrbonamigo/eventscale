import { Hero } from "../components/hero";
import { EventGrid } from "../components/event-grid";
import { EventFooter } from "../components/event-footer";

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col items-center bg-slate-950">

            {/* Top Section (Showcase) */}
            <Hero />

            {/* Event Listing (The Grid) */}
            <EventGrid />

            {/* Footer Section (New) */}
            <EventFooter />

        </main>
    );
}