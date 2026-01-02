// Adicione "text" aos imports se já não estiver lá
import { pgTable, serial, text, timestamp, integer, decimal } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    location: text("location").notNull(),
    date: timestamp("date").notNull(),
    imageUrl: text("image_url"),
    category: text("category").notNull().default("All"), // ✨ Nova coluna!
});

// Tabela de Assentos/Ingressos (Onde a mágica da concorrência acontece)
export const seats = pgTable("seats", {
    id: serial("id").primaryKey(),
    eventId: integer("event_id").references(() => events.id),
    seatNumber: text("seat_number").notNull(),
    status: text("status").notNull().default("available"), // available, reserved, sold
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
});