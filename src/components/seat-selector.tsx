"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface Seat {
    id: number;
    seatNumber: string;
    status: string;
    price: string;
}

interface SeatSelectorProps {
    seats: Seat[];
    selectedSeatId: number | null;
    onSelectSeat: (seat: Seat) => void;
}

export function SeatSelector({ seats, selectedSeatId, onSelectSeat }: SeatSelectorProps) {
    const rows = Array.from(new Set(seats.map(s => s.seatNumber.charAt(0)))).sort();

    return (
        <div className="w-full overflow-x-auto pb-6 custom-scrollbar px-2">

            {/* 'min-w-max': Ensures container expands as needed preventing squashing.
                'mx-auto': Centers the grid if there is extra space. */}
            <div className="min-w-max flex flex-col gap-6 items-center mx-auto p-4">

                {/* Visual Stage */}
                <div className="w-full flex justify-center mb-4">
                    <div className="w-96 h-3 bg-purple-500/20 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.2)]" />
                </div>

                {rows.map((rowLabel) => (
                    <div key={rowLabel} className="flex items-center gap-6">

                        {/* Left Label */}
                        <span className="w-8 text-sm font-bold text-slate-500 text-center font-mono">
                            {rowLabel}
                        </span>

                        {/* Seats Row */}
                        {/* 'gap-4': Spreads the buttons horizontally */}
                        <div className="flex gap-4">
                            {seats
                                .filter(s => s.seatNumber.startsWith(rowLabel))
                                .sort((a, b) => parseInt(a.seatNumber.slice(1)) - parseInt(b.seatNumber.slice(1)))
                                .map((seat) => {
                                    const isSelected = selectedSeatId === seat.id;
                                    const isAvailable = seat.status === 'available';

                                    return (
                                        <motion.button
                                            key={seat.id}
                                            disabled={!isAvailable}
                                            onClick={() => onSelectSeat(seat)}
                                            whileHover={isAvailable ? { scale: 1.1, zIndex: 10 } : {}}
                                            whileTap={isAvailable ? { scale: 0.95 } : {}}
                                            // VISUAL FIX:
                                            // 1. w-12 h-12: Fixed larger dimensions.
                                            // 2. flex-shrink-0: PREVENTS squashing (keeps them square).
                                            // 3. aspect-square: Enforces 1:1 ratio.
                                            className={`
                                                relative w-12 h-12 flex-shrink-0 aspect-square rounded-xl flex items-center justify-center transition-all duration-200
                                                border shadow-md
                                                ${!isAvailable
                                                ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed opacity-40'
                                                : isSelected
                                                    ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10'
                                                    : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-white hover:border-slate-500'
                                            }
                                            `}
                                            title={`Seat ${seat.seatNumber}`}
                                        >
                                            {isSelected ? (
                                                <Check className="w-6 h-6" />
                                            ) : (
                                                <span className="text-sm font-bold">{seat.seatNumber.slice(1)}</span>
                                            )}
                                        </motion.button>
                                    );
                                })}
                        </div>

                        {/* Right Label */}
                        <span className="w-8 text-sm font-bold text-slate-500 text-center font-mono">
                            {rowLabel}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}