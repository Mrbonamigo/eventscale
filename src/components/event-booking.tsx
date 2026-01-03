'use client';

import { useState } from 'react';
import { SeatSelector } from './seat-selector';
import { reserveSeat } from '@/lib/actions'; // We'll create this action next

interface Seat {
    id: number;
    seatNumber: string;
    status: 'available' | 'reserved';
    price?: string;
}

interface EventBookingProps {
    eventPrice: string;
    seats: Seat[];
}

export function EventBooking({ eventPrice, seats }: EventBookingProps) {
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleBooking() {
        if (!selectedSeat) return;

        setIsPending(true);

        // Calling the Server Action
        const result = await reserveSeat(selectedSeat.id);

        setIsPending(false);

        if (result.success) {
            setSelectedSeat(null); // Clear selection on success
            alert("Success! Your seat is reserved. 🎟️");
        } else {
            alert(result.message);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Side: Seat Map */}
            <div className="md:col-span-2">
                <section className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-8 text-center text-slate-200">
                        Interactive Seat Map
                    </h3>

                    <SeatSelector
                        seats={seats}
                        selectedSeatId={selectedSeat?.id || null}
                        onSelectSeat={(seat) => setSelectedSeat(seat)}
                    />
                </section>
            </div>

            {/* Right Side: Price Card & Checkout */}
            <aside>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md h-fit sticky top-8">
                    <div className="text-sm text-slate-400 mb-1">Total Price</div>

                    <div className="text-3xl font-bold text-cyan-400 mb-6">
                        {selectedSeat ? (selectedSeat.price || eventPrice) : "---"}
                    </div>

                    {selectedSeat && (
                        <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-xs text-slate-400">Selected Seat</p>
                            <p className="text-sm font-bold text-purple-400">{selectedSeat.seatNumber}</p>
                        </div>
                    )}

                    <button
                        onClick={handleBooking}
                        disabled={!selectedSeat || isPending}
                        className={`w-full rounded-xl py-3 font-bold text-white transition-all flex items-center justify-center gap-2
                            ${selectedSeat && !isPending
                            ? 'bg-purple-600 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                        `}
                    >
                        {isPending ? (
                            <>
                                <span className="animate-spin text-lg">⏳</span>
                                Processing...
                            </>
                        ) : (
                            selectedSeat ? 'Secure Spot' : 'Select a Seat'
                        )}
                    </button>

                    <p className="mt-4 text-[10px] text-slate-500 text-center uppercase tracking-widest">
                        {isPending ? 'Communicating with server...' : (selectedSeat ? 'Ready to checkout' : 'Choose your seat to proceed')}
                    </p>
                </div>
            </aside>
        </div>
    );
}