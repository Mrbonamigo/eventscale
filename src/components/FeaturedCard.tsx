"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface FeaturedCardProps {
    title: string;
    date: string;
    location: string;
    imageUrl: string;
}

export function FeaturedCard({ title, date, location, imageUrl }: FeaturedCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Captura da posição do mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Suavização (Spring) para um movimento orgânico
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // 3. Efeito Parallax: A imagem se move na direção oposta ao mouse
    // O valor "10%" garante que a imagem (que deve ser maior que o card) cubra as bordas
    const imgX = useTransform(springX, [-0.5, 0.5], ["2%", "-2%"]);
    const imgY = useTransform(springY, [-0.5, 0.5], ["2%", "-2%"]);

    // 4. Efeito de Texto: O bloco de vidro se move levemente para reforçar o 3D
    const textX = useTransform(springX, [-0.5, 0.5], ["-10px", "10px"]);
    const textY = useTransform(springY, [-0.5, 0.5], ["-5px", "5px"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 cursor-pointer isolate group"
        >
            {/* Camada de Imagem com Parallax */}
            <motion.img
                src={imageUrl}
                alt={title}
                style={{ x: imgX, y: imgY, scale: 1.1 }}
                className="absolute inset-0 w-full h-full object-cover -z-20 transition-opacity duration-500 group-hover:opacity-80"
            />

            {/* Overlay de gradiente para contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent -z-10" />

            {/* Bloco de Conteúdo (Painel de Vidro) com movimento oposto */}
            <motion.div
                style={{ x: textX, y: textY }}
                className="absolute bottom-8 left-8 right-8 p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Destaque da Semana
            </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tighter">
                        {title}
                    </h2>

                    <div className="flex flex-wrap gap-6 text-slate-300">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">{date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">{location}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}