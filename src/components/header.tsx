"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Ticket } from "lucide-react";

export function Header() {
    return (
        // Container Principal: Fixo no topo, fundo escuro com desfoque (Glassmorphism)
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* --- LADO ESQUERDO: LOGO --- */}
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/50">
                        <Ticket className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">
                        EventScale
                    </span>
                </Link>

                {/* --- LADO DIREITO: LOGIN / MENU --- */}
                <div className="flex items-center gap-4">

                    {/* Se o usuário estiver LOGADO: */}
                    <SignedIn>
                        {/* Links de navegação (visíveis apenas em desktop) */}
                        <nav className="hidden md:flex items-center gap-6 mr-6 text-sm font-medium text-slate-300">
                            <Link href="/tickets" className="hover:text-white transition-colors">
                                Meus Ingressos
                            </Link>
                            {/* Opcional: Link para Admin */}
                            {/* <Link href="/admin" className="hover:text-white">Admin</Link> */}
                        </nav>

                        {/* Botão de Perfil do Clerk */}
                        <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 ring-2 ring-purple-500/20"
                                    }
                                }}
                            />
                        </div>
                    </SignedIn>

                    {/* Se o usuário for VISITANTE (Não logado): */}
                    <SignedOut>
                        <div className="flex items-center gap-3">
                            {/* Botão de Entrar (Texto simples) */}
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2">
                                    Entrar
                                </button>
                            </SignInButton>

                            {/* Botão de Cadastro (Destaque Roxo) */}
                            <SignInButton mode="modal">
                                <button className="text-sm font-bold bg-white text-slate-950 px-4 py-2 rounded-full hover:bg-purple-50 transition-all shadow-md">
                                    Cadastrar
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>

                </div>
            </div>
        </header>
    );
}