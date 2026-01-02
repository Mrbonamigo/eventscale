"use client";

import { EventCard } from "./event-card"; // Importamos o cartão visual

// Definimos o formato dos dados que esperamos receber (do banco de dados)
interface EventData {
    id: string;
    title: string;
    location: string;
    date: string | Date;
    imageUrl: string | null;
}

interface EventGridProps {
    events: EventData[];
}

export function EventGrid({ events }: EventGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    id={String(event.id)} // O banco manda número, o Card pede texto
                    title={event.title}
                    location={event.location}
                    date={new Date(event.date).toLocaleDateString('pt-BR')} // Formatamos a data
                    imageUrl={event.imageUrl || "https://via.placeholder.com/400"} // Imagem padrão se faltar
                    price="100.00" // Valor fixo por enquanto (já que o preço fica noutra tabela)
                />
            ))}
        </div>
    );
}