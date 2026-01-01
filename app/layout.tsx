import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// We import the Header component we just created
import { Header } from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "EventScale",
    description: "High-scale event ticketing platform",
};
import { BackgroundCircles } from "../components/background-circles";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-slate-950 text-white`}>
        <Header />
        {/* We place the circles here so they stay behind the content */}
        <BackgroundCircles />
        <main>{children}</main>
        </body>
        </html>
    );
}