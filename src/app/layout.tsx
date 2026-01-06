import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Importamos o ClerkProvider e o tema Dark
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Header } from "../components/header";
import { BackgroundCircles } from "../components/background-circles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "EventScale",
    description: "High-scale event ticketing platform",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // 2. Envolvemos todo o HTML com o ClerkProvider
        // Adicionei a prop 'appearance' para o login combinar com seu site escuro
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: { colorPrimary: "#9333ea" } // Roxo (combinando com seu tema)
            }}
        >
            <html lang="en">
            <body className={`${inter.className} bg-slate-950 text-white`}>
            <Header />
            <BackgroundCircles />
            <main>{children}</main>
            </body>
            </html>
        </ClerkProvider>
    );
}