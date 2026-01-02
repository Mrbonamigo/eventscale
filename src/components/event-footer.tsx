export function EventFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-24 w-full border-t border-white/10 bg-slate-900/50 py-12 backdrop-blur-md">

            <div className="w-full mx-auto flex flex-col items-center justify-between gap-6 px-8 md:flex-row">
                {/* 1. Brand Identity */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white">
                        Event<span className="text-purple-500">Scale</span>
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Connecting you to the future of entertainment.
                    </p>
                </div>


                <div className="flex items-center justify-center space-x-8 text-sm font-medium text-slate-300">
                    <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Discord</a>
                </div>

                {/* 3. Copyright */}
                <div className="text-xs text-slate-500">
                    © {currentYear} EventScale Inc.
                </div>

            </div>
        </footer>
    );
}