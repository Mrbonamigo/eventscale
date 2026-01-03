'use server';

import { db } from "@/db";
import { seats } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Reservates a specific seat for an event.
 * @param seatId - The unique ID of the seat to be reserved.
 */
export async function reserveSeat(seatId: number) {
    try {
        // 1. We should update the seat only if it's currently 'available'
        // This prevents double-booking if two people click at the same time.
        const result = await db
            .update(seats)
            .set({ status: 'reserved' })
            .where(
                and(
                    eq(seats.id, seatId),
                    eq(seats.status, 'available')
                )
            );

        // 2. We check if any row was actually updated
        if (result.rowCount === 0) {
            return { success: false, message: "Seat is no longer available." };
        }

        // 3. Clear the cache for the event page so the user sees the updated seat map
        revalidatePath('/events/[id]', 'page');

        return { success: true };
    } catch (error) {
        console.error("Failed to reserve seat:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}