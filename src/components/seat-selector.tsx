'use client';

/**
 * Interface representing the seat structure.
 */
interface Seat {
    id: number;
    seatNumber: string;
    status: 'available' | 'reserved';
    price?: string;
}

interface SeatSelectorProps {
    seats: Seat[];
    selectedSeatId: number | null;
    onSelectSeat: (seat: Seat) => void;
}

export function SeatSelector({ seats, selectedSeatId, onSelectSeat }: SeatSelectorProps) {
    return (
        <div className="w-full">
            {/* 🎭 Stage Representation: Visual anchor for the user */}
            <div className="w-full h-4 bg-slate-800 rounded-lg mb-12 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold text-center">
                    Stage / Screen
                </span>
            </div>

            {/* 💺 Responsive Seat Grid: Adapts columns based on screen size */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {seats.map((seat) => {
                    const isSelected = selectedSeatId === seat.id;
                    const isReserved = seat.status === 'reserved';

                    return (
                        <button
                            key={seat.id}
                            disabled={isReserved}
                            type="button"
                            onClick={() => onSelectSeat(seat)}
                            className={`
                                p-3 rounded-xl border transition-all duration-200 text-sm font-medium
                                ${isReserved
                                ? 'bg-slate-900 border-white/5 text-slate-700 cursor-not-allowed'
                                : isSelected
                                    ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-purple-500/50 hover:bg-white/10'}
                            `}
                        >
                            {seat.seatNumber}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}