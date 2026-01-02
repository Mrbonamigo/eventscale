import { Hero } from "@/components/hero";
import { EventSection } from "@/components/event-section";
import { EventFooter } from "@/components/event-footer"; // Ou EventFooter, conforme o seu nome
import { getAllEvents } from "@/lib/data";

export default async function Home() {
    const allEvents = await getAllEvents();

    return (
        <main className="min-h-screen bg-black">
            <Hero />

            {/* O EventSection agora agrupa a SearchBar e o EventGrid */}
            <EventSection initialEvents={allEvents} />

            <EventFooter />
        </main>
    );
}