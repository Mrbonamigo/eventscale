import { Hero } from "@/components/hero";
import { EventSection } from "@/components/event-section";
import { EventFooter } from "@/components/event-footer";
import { getAllEvents } from "@/lib/data";

interface HomeProps {
    // No Next.js 15+, searchParams é uma Promise
    searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    // 1. Aguardamos os parâmetros da URL
    const { category } = await searchParams;

    // 2. Procuramos todos os eventos no banco
    const allEvents = await getAllEvents();

    // 3. Aplicamos a lógica de filtro
    // Se a categoria for "All" ou estiver vazia, mostramos tudo.
    // Caso contrário, filtramos pela categoria exata.
    const filteredEvents = !category || category === "All"
        ? allEvents
        : allEvents.filter(event => event.category === category);

    const featuredEvent = allEvents[0];

    return (
        <main className="min-h-screen bg-black">
            <Hero featuredEvent={featuredEvent} />

            {/* 4. Passamos os eventos já filtrados para a seção */}
            <EventSection initialEvents={filteredEvents} />

            <EventFooter />
        </main>
    );
}