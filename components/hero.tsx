import Link from "next/link";

export function Hero() {
    return (
        <section className="container flex flex-col items-center text-center gap-8 pb-8 pt-6 md:py-20">
            <div className="flex max-w-[980px] flex-col items-center gap-4">

                {/* GRADIENT TEXT: We use 'bg-clip-text' and 'text-transparent' to show the background colors through the letters */}
                <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl text-white">
                    The Future of <span className="text-purple-400">Live Events</span> <br />
                    is <span
                    style={{
                        backgroundImage: 'linear-gradient(to right, #a78bfa, #22d3ee)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
    Secure and Scalable.
  </span>
                </h1>

                <p className="max-w-[700px] text-lg text-slate-400 md:text-xl">
                    Buy tickets for the biggest concerts and matches without crashes.
                    Powered by high-performance architecture.
                </p>
            </div>

            <div className="flex gap-4">
                {/* Primary Button with a subtle glow */}
                <Link
                    href="/events"
                    className="rounded-full bg-purple-600 px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-700 transition-all"
                >
                    Browse Events
                </Link>

                <Link
                    href="/about"
                    className="rounded-full border border-slate-700 bg-slate-900/50 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all"
                >
                    Learn More
                </Link>
            </div>
        </section>
    );
}