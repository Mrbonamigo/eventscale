"use server";

import { db } from "@/db";
import { seats } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function reserveSeat(seatId: number) {
    console.log("🖱️ Attempting to reserve seat ID:", seatId);

    try {
        // 1. Get the current user session
        const session = await auth();
        const userId = session.userId;

        // 2. Security Check: If no user is logged in, block the request
        if (!userId) {
            return { success: false, message: "You must be logged in to reserve a seat." };
        }

        // 3. Database Update (Optimistic Concurrency Control)
        // We only update if the seat status is currently 'available'.
        const result = await db
            .update(seats)
            .set({
                status: 'reserved',
                // Optional: Save userId here if your schema supports it
                // userId: userId
            })
            .where(
                and(
                    eq(seats.id, seatId),
                    eq(seats.status, 'available')
                )
            );

        // 4. Check if the update actually happened
        if (result.rowCount === 0) {
            return { success: false, message: "This seat was just taken by someone else." };
        }

        // 5. Refresh the UI
        revalidatePath('/events/[id]', 'page');

        return { success: true, message: "Reservation confirmed!" };
    } catch (error) {
        console.error("Failed to reserve seat:", error);
        return { success: false, message: "Internal server error." };
    }
}