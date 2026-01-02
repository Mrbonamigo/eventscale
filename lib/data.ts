// Define the shape of our data
// Em @/lib/data.ts
// No seu arquivo @/lib/data.ts
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    price: string;
    imageUrl: string;
    category: string;
}

export const EVENTS: Event[] = [
    {
        id: "neon-nights",
        title: "Neon Nights Festival",
        date: "Aug 15, 2026",
        location: "Cyber City Arena",
        price: "$150",
        description: "Get ready for an electrifying night...",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
        category: "Parties"
    },
    {
        id: "tech-summit",
        title: "Tech Summit 2077",
        date: "Sep 22, 2026",
        location: "Silicon Convention Center",
        price: "$299",
        description: "The biggest gathering...",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        category: "Shows"
    },
    {
        id: "cyber-symphony",
        title: "Cyber Symphony",
        date: "Oct 10, 2026",
        location: "Neo Opera House",
        price: "$85",
        description: "A unique fusion...",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60",
        category: "Theater"
    }
];

// New function to fetch all events
// We need this to list them on the home page
export async function getAllEvents(): Promise<Event[]> {
    // Wait 500ms to simulate latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    return EVENTS;
}

// The function we'll use to fetch a specific event
export async function getEventById(id: string): Promise<Event | undefined> {
    // Wait 500ms to simulate latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    return EVENTS.find((event) => event.id === id);
}