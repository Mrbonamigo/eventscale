import "dotenv/config";
import { db } from "./index";
import { events, seats } from "./schema";

async function seed() {
    console.log("🌱 Starting database seed...");

    try {
        // 1. Clean existing data to avoid duplicates
        console.log("🧹 Clearing existing data...");
        await db.delete(seats);
        await db.delete(events);

        // 2. Array with 10 Global Events with specific categories
        const eventsToSeed = [
            {
                title: "Global Tech Summit 2026",
                category: "Tech & Innovation",
                description: "The leading tech conference in Silicon Valley, focusing on AI and Quantum Computing.",
                location: "San Francisco, USA",
                date: new Date("2026-05-15T09:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "London Summer Rock Fest",
                category: "Music & Nightlife",
                description: "Three days of legendary rock performances at Wembley.",
                location: "London, UK",
                date: new Date("2026-07-10T18:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1459749411177-287ce51261df?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "Authentic Italian Cooking Class",
                category: "Gastronomy",
                description: "Master the art of pasta making with local chefs in the heart of Rome.",
                location: "Rome, Italy",
                date: new Date("2026-04-20T14:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "Berlin Startup Marathon",
                category: "Tech & Innovation",
                description: "48 hours to build, pitch, and launch your next big idea.",
                location: "Berlin, Germany",
                date: new Date("2026-08-05T08:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "Louvre Modern Art Night",
                category: "Art & Culture",
                description: "An exclusive night tour exploring the contrast between classic and digital art.",
                location: "Paris, France",
                date: new Date("2026-03-12T20:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3969105?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "NYC Digital Marketing Week",
                category: "Marketing & Business",
                description: "Top strategies for brand growth in the competitive US market.",
                location: "New York City, USA",
                date: new Date("2026-06-01T09:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "Seoul E-Sports Championship",
                category: "Gaming & E-sports",
                description: "Watch the world's best teams compete in the League of Legends finals.",
                location: "Seoul, South Korea",
                date: new Date("2026-09-15T12:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "Tokyo Literature & Manga Fair",
                category: "Art & Culture",
                description: "A celebration of Japanese storytelling from traditional novels to modern manga.",
                location: "Tokyo, Japan",
                date: new Date("2026-10-28T10:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "Bali Yoga & Wellness Retreat",
                category: "Wellness",
                description: "Reconnect with nature and yourself in the spiritual center of Ubud.",
                location: "Bali, Indonesia",
                date: new Date("2026-11-02T07:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80",
            },
            {
                title: "Sydney Green Energy Con",
                category: "Sustainability",
                description: "Innovations in renewable energy and ocean sustainability.",
                location: "Sydney, Australia",
                date: new Date("2026-05-22T09:00:00"),
                imageUrl: "https://images.unsplash.com/photo-1497435334941-8c699ee63e03?auto=format&fit=crop&w=1000&q=80",
            }
        ];

        console.log("📝 Inserting events...");
        const insertedEvents = await db
            .insert(events)
            .values(eventsToSeed)
            .returning({ id: events.id });

        console.log(`✅ ${insertedEvents.length} events created. Generating seats...`);

        const seatsToSeed: any[] = [];

        insertedEvents.forEach((event) => {
            const randomSeatCount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;

            for (let i = 1; i <= randomSeatCount; i++) {
                const randomPrice = (Math.random() * (150 - 50) + 50).toFixed(2);
                seatsToSeed.push({
                    eventId: event.id,
                    seatNumber: `Seat-${i}`,
                    price: randomPrice,
                    status: "available",
                });
            }
        });

        await db.insert(seats).values(seatsToSeed);
        console.log(`✅ ${seatsToSeed.length} seats created!`);
        console.log("🚀 Seed completed successfully!");

    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
}

seed();