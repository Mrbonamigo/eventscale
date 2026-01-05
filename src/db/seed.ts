import 'dotenv/config';
import { db } from "@/db";
import { events, seats } from "@/db/schema";

// --- AJUDANTE DE DATA DINÂMICA ---
function getFutureDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

// 1. Interfaces
interface EventSection {
    category: string;
    price: string;
    rows: number;
    seatsPerRow: number;
    startRowLabel: string;
}

interface EventSeedData {
    title: string;
    description: string;
    date: Date;
    location: string;
    imageUrl: string;
    category: string;
    sections: EventSection[];
}

async function seed() {
    console.log("🌱 Seeding database with FINAL CORRECTED images...");

    await db.delete(seats);
    await db.delete(events);

    // 2. Lista de Eventos
    const eventsData: EventSeedData[] = [
        // --- Tech & Business ---
        {
            title: "Global Tech Summit",
            description: "The leading conference for software innovation.",
            date: getFutureDate(14),
            location: "Convention Center Hall A",
            imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
            category: "Technology",
            sections: [
                { category: 'VIP Front', price: '300.00', rows: 3, seatsPerRow: 12, startRowLabel: 'A' },
                { category: 'Regular', price: '150.00', rows: 10, seatsPerRow: 20, startRowLabel: 'D' }
            ]
        },
        {
            title: "AI Revolution Workshop",
            description: "Hands-on workshop on LLMs and generative AI.",
            date: getFutureDate(21),
            location: "Tech Hub Auditorium",
            imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
            category: "Technology",
            sections: [
                { category: 'General', price: '200.00', rows: 5, seatsPerRow: 8, startRowLabel: 'A' }
            ]
        },
        {
            title: "Startup Pitch Night",
            description: "Watch the next unicorn companies pitch their ideas.",
            date: getFutureDate(30),
            location: "Innovation Loft",
            imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
            category: "Business",
            sections: [
                { category: 'Investor Zone', price: '0.00', rows: 2, seatsPerRow: 5, startRowLabel: 'A' },
                { category: 'Audience', price: '20.00', rows: 6, seatsPerRow: 10, startRowLabel: 'C' }
            ]
        },
        {
            title: "Crypto Future Conference",
            description: "Discussing the future of decentralized finance.",
            date: getFutureDate(45),
            location: "Financial District Hotel",
            imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
            category: "Finance",
            sections: [
                { category: 'Premium', price: '500.00', rows: 4, seatsPerRow: 8, startRowLabel: 'A' }
            ]
        },

        // --- Music & Concerts ---
        {
            title: "Summer Rock Blast",
            description: "Open air rock festival featuring top bands.",
            date: getFutureDate(5),
            location: "City Stadium",
            imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80",
            category: "Music",
            sections: [
                { category: 'Golden Circle', price: '120.00', rows: 5, seatsPerRow: 30, startRowLabel: 'A' },
                { category: 'Field', price: '80.00', rows: 10, seatsPerRow: 40, startRowLabel: 'F' }
            ]
        },
        {
            title: "Jazz & Blues Night",
            description: "Smooth evening with the best jazz quartet.",
            date: getFutureDate(2),
            location: "Blue Note Club",
            imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
            category: "Music",
            sections: [
                { category: 'Table Seat', price: '60.00', rows: 4, seatsPerRow: 4, startRowLabel: 'A' },
                { category: 'Bar Stool', price: '30.00', rows: 2, seatsPerRow: 10, startRowLabel: 'E' }
            ]
        },
        {
            title: "Symphony Orchestra Gala",
            description: "Beethoven's 9th performed live.",
            date: getFutureDate(60),
            location: "Grand Opera House",
            imageUrl: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=800&q=80",
            category: "Music",
            sections: [
                { category: 'Box', price: '250.00', rows: 2, seatsPerRow: 4, startRowLabel: 'A' },
                { category: 'Orchestra', price: '150.00', rows: 8, seatsPerRow: 15, startRowLabel: 'C' },
                { category: 'Balcony', price: '80.00', rows: 5, seatsPerRow: 20, startRowLabel: 'K' }
            ]
        },
        {
            title: "Indie Pop Showcase",
            description: "Discover the newest voices in indie pop.",
            date: getFutureDate(10),
            location: "The Warehouse",
            imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
            category: "Music",
            sections: [
                { category: 'General Admission', price: '40.00', rows: 6, seatsPerRow: 12, startRowLabel: 'A' }
            ]
        },
        {
            title: "Electronic Beats Night",
            description: "All night DJ set with special guests.",
            date: getFutureDate(1),
            location: "Club Underground",
            imageUrl: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80",
            category: "Music",
            sections: [
                { category: 'VIP Lounge', price: '100.00', rows: 2, seatsPerRow: 6, startRowLabel: 'A' },
                { category: 'Dance Floor', price: '50.00', rows: 5, seatsPerRow: 10, startRowLabel: 'C' }
            ]
        },

        // --- Arts & Theater ---
        // 🔄 FIXED: Arquitetura Italiana (Sem pessoas, impossível errar)
        {
            title: "Romeo & Juliet",
            description: "A modern take on the classic tragedy.",
            date: getFutureDate(40),
            location: "City Theater",
            imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
            category: "Theater",
            sections: [
                { category: 'Front Stalls', price: '90.00', rows: 4, seatsPerRow: 12, startRowLabel: 'A' },
                { category: 'Rear Stalls', price: '60.00', rows: 6, seatsPerRow: 14, startRowLabel: 'E' }
            ]
        },
        {
            title: "Comedy All-Stars",
            description: "A night of laughter with top comedians.",
            date: getFutureDate(8),
            location: "Laugh Factory",
            imageUrl: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=800&q=80",
            category: "Theater",
            sections: [
                { category: 'Front Table', price: '55.00', rows: 3, seatsPerRow: 4, startRowLabel: 'A' },
                { category: 'Regular', price: '35.00', rows: 5, seatsPerRow: 8, startRowLabel: 'D' }
            ]
        },
        {
            title: "Modern Art Exhibition",
            description: "Exclusive preview of the new collection.",
            date: getFutureDate(3),
            location: "Modern Art Museum",
            imageUrl: "https://images.unsplash.com/photo-1545989253-02cc26577f88?w=800&q=80",
            category: "Art",
            sections: [
                { category: 'Entry', price: '25.00', rows: 10, seatsPerRow: 5, startRowLabel: 'A' }
            ]
        },
        // 🔄 MANTIDA: Circo Mágico (Luzes)
        {
            title: "Cirque de la Nuit",
            description: "A magical circus performance for all ages.",
            date: getFutureDate(25),
            location: "Big Top Tent",
            imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
            category: "Theater",
            sections: [
                { category: 'Ringside', price: '80.00', rows: 2, seatsPerRow: 20, startRowLabel: 'A' },
                { category: 'Bleachers', price: '40.00', rows: 8, seatsPerRow: 25, startRowLabel: 'C' }
            ]
        },

        // --- Sports & Wellness ---
        {
            title: "Championship Boxing",
            description: "The fight of the century.",
            date: getFutureDate(90),
            location: "Grand Arena",
            imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
            category: "Sports",
            sections: [
                { category: 'Ringside', price: '1000.00', rows: 2, seatsPerRow: 10, startRowLabel: 'A' },
                { category: 'Lower Bowl', price: '300.00', rows: 5, seatsPerRow: 20, startRowLabel: 'C' },
                { category: 'Upper Bowl', price: '100.00', rows: 10, seatsPerRow: 30, startRowLabel: 'H' }
            ]
        },
        {
            title: "Yoga & Meditation Retreat",
            description: "A day of peace and mindfulness.",
            date: getFutureDate(12),
            location: "Serenity Park",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
            category: "Wellness",
            sections: [
                { category: 'Mat Space', price: '50.00', rows: 5, seatsPerRow: 10, startRowLabel: 'A' }
            ]
        },
        {
            title: "Charity Marathon",
            description: "Run for a cause. Entry fee includes kit.",
            date: getFutureDate(50),
            location: "City Center Start Line",
            imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
            category: "Sports",
            sections: [
                { category: 'Runner', price: '45.00', rows: 1, seatsPerRow: 50, startRowLabel: 'A' }
            ]
        },
        {
            title: "Basketball Finals",
            description: "City Hawks vs. State Bears.",
            date: getFutureDate(6),
            location: "Sports Complex",
            imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80",
            category: "Sports",
            sections: [
                { category: 'Courtside', price: '500.00', rows: 1, seatsPerRow: 20, startRowLabel: 'A' },
                { category: 'General', price: '80.00', rows: 10, seatsPerRow: 25, startRowLabel: 'B' }
            ]
        },

        // --- Education & Others ---
        {
            title: "Cooking Masterclass: Italian",
            description: "Learn to make pasta from scratch.",
            date: getFutureDate(15),
            location: "Culinary Institute",
            imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
            category: "Education",
            sections: [
                { category: 'Student Station', price: '120.00', rows: 2, seatsPerRow: 6, startRowLabel: 'A' }
            ]
        },
        {
            title: "Photography Walk",
            description: "Guided tour through the historic district.",
            date: getFutureDate(4),
            location: "Old Town Square",
            imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
            category: "Art",
            sections: [
                { category: 'Group', price: '30.00', rows: 1, seatsPerRow: 15, startRowLabel: 'A' }
            ]
        },
        {
            title: "Wine Tasting Evening",
            description: "Sample the finest wines from the region.",
            date: getFutureDate(18),
            location: "Vineyard Estate",
            imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
            category: "Food & Drink",
            sections: [
                { category: 'Tasting Table', price: '75.00', rows: 4, seatsPerRow: 5, startRowLabel: 'A' }
            ]
        }
    ];

    // 3. Insert Events
    const createdEvents = await db.insert(events).values(eventsData).returning();
    console.log(`✅ Created ${createdEvents.length} distinct events.`);

    const allSeats: (typeof seats.$inferInsert)[] = [];

    // 4. Generate Seats
    createdEvents.forEach((event, index) => {
        const blueprint = eventsData[index].sections;
        blueprint.forEach((section) => {
            const startCharCode = section.startRowLabel.charCodeAt(0);
            for (let r = 0; r < section.rows; r++) {
                const currentRowLabel = String.fromCharCode(startCharCode + r);
                for (let s = 1; s <= section.seatsPerRow; s++) {
                    allSeats.push({
                        eventId: event.id,
                        seatNumber: `${currentRowLabel}${s}`,
                        status: 'available',
                        price: section.price,
                    });
                }
            }
        });
    });

    if (allSeats.length > 0) {
        await db.insert(seats).values(allSeats);
    }

    console.log(`✅ Seed complete! Created ${allSeats.length} seats.`);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});