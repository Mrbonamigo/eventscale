"use client";

import { useState } from "react";
import { Loader2, Ticket, CreditCard, Info } from "lucide-react";
import { reserveSeat } from "@/lib/actions";
import { SeatSelector, Seat } from "./seat-selector";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk } from "@clerk/nextjs";

interface EventBookingProps {
    eventPrice: string;
    seats: Seat[];
}

export function EventBooking({ eventPrice, seats }: EventBookingProps) {
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [isPending, setIsPending] = useState(false);

    const { openSignIn } = useClerk();

    const formatCurrency = (value: string | number) => {
        const num = typeof value === 'string' ? parseFloat(value.replace('$', '')) : value;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    async function handleBooking() {
        if (!selectedSeat) return;
        setIsPending(true);

        try {
            const result = await reserveSeat(selectedSeat.id);

            if (result.success) {
                alert("Success! Your seat is reserved. 🎟️");
                setSelectedSeat(null);
            } else {
                if (result.message.includes("logged in")) {
                    openSignIn();
                } else {
                    alert("Error: " + result.message);
                }
            }
        } catch (error) {
            console.error(error);
            alert("Unexpected error.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        // LAYOUT FLUIDO: Flexbox em vez de Grid
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">

            {/* --- MAPA (Esquerda) --- */}
            {/* 'flex-1': Ocupa todo o espaço disponível
                'min-w-0': Impede que o scroll interno quebre o layout (segredo do CSS) */}
            <div className="flex-1 min-w-0 w-full bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                <div className="p-6 border-b border-white/5 bg-slate-800/50 flex flex-wrap justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Ticket className="text-purple-400 w-5 h-5" />
                        Select Seat
                    </h3>

                    <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-700" /> Booked
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-500" /> Available
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500" /> Selected
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-950/30 min-h-[500px] flex items-center justify-center">
                    <SeatSelector
                        seats={seats}
                        selectedSeatId={selectedSeat?.id || null}
                        onSelectSeat={setSelectedSeat}
                    />
                </div>
            </div>

            {/* --- CHECKOUT (Direita) --- */}
            {/* Largura fixa de 360px no Desktop para não ficar "sambando" */}
            <aside className="w-full lg:w-[360px] flex-shrink-0 sticky top-8">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <h3 className="text-lg font-bold text-white mb-6">Reservation</h3>

                    <div className="min-h-[150px] space-y-4">
                        <AnimatePresence mode="wait">
                            {selectedSeat ? (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white/5 rounded-2xl p-5 border border-white/5"
                                >
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold">Seat</p>
                                            <p className="text-3xl font-bold text-white">{selectedSeat.seatNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-purple-400">
                                                {formatCurrency(selectedSeat.price || eventPrice)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-white/10 my-4" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300">Total</span>
                                        <span className="text-white font-bold">{formatCurrency(selectedSeat.price || eventPrice)}</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-2xl py-8"
                                >
                                    <Info className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm font-medium">Select a seat to proceed</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={!selectedSeat || isPending}
                        className={`
                            w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2
                            ${selectedSeat && !isPending
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                        }
                        `}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Processing
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-4 h-4" /> Confirm Booking
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </div>
    );
}