export function BackgroundCircles() {
    return (
        // 'fixed' keeps it in place, '-z-10' sends it to the back
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

            {/* Purple Glow - Using built-in Tailwind colors for testing */}
            <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/30 blur-[120px]" />

            {/* Cyan Glow */}
            <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-cyan-400/30 blur-[100px]" />

            {/* Pink Glow */}
            <div className="absolute -bottom-[10%] left-[20%] h-[600px] w-[600px] rounded-full bg-pink-500/20 blur-[150px]" />

        </div>
    );
}