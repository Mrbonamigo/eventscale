// Define the shape of our data
export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    description: string;
    imageUrl: string;
}

// Our static "Database"
const EVENTS: Event[] = [
    {
        id: "neon-nights",
        title: "Neon Nights Festival",
        date: "Aug 15, 2026",
        location: "Cyber City Arena",
        price: "$150",
        description: "Get ready for an electrifying night with the greatest DJs of the future. Neon lights, immersive sound, and cutting-edge technology await you at this unforgettable festival.",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: "tech-summit",
        title: "Tech Summit 2077",
        date: "Sep 22, 2026",
        location: "Silicon Convention Center",
        price: "$299",
        description: "The biggest gathering of brilliant minds of the century. Discover the innovations that will shape the next decade, from advanced AI to space exploration.",
        // UPDATED IMAGE URL BELOW
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: "cyber-symphony",
        title: "Cyber Symphony",
        date: "Oct 10, 2026",
        location: "Neo Opera House",
        price: "$85",
        description: "A unique fusion of classical music and digital synthesizers. The philharmonic orchestra meets cyberpunk in a transcendental sonic experience.",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60"
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