"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

const categories = ["All", "Shows", "Parties", "Theater", "Sports"];

export function CategoryFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentCategory = searchParams.get("category") || "All";

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category === "All") params.delete("category");
        else params.set("category", category);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Faltava o comando return e a estrutura de contêiner abaixo:
    return (
        <div className="w-full overflow-hidden py-4">
            <div className="flex flex-nowrap gap-4 overflow-x-auto pb-6 px-4 no-scrollbar snap-x scroll-smooth">
                {categories.map((cat) => {
                    const isActive = currentCategory === cat;

                    return (
                        <div key={cat} className="snap-center shrink-0">
                            <Button
                                onClick={() => handleCategoryChange(cat)}
                                className={`
                                    rounded-full px-8 py-6 font-bold uppercase tracking-tighter transition-all duration-300
                                    ${isActive
                                    ? "bg-purple-600 text-white border-transparent shadow-[0_0_25px_rgba(168,85,247,0.7)] scale-105"
                                    : "bg-white/5 text-slate-400 border border-white/10 hover:border-purple-500/50 hover:text-white"
                                }
                                `}
                            >
                                {cat}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}