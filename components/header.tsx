import Link from "next/link";

export function Header() {
    return (
        // The main container for our header
        // It has a border at the bottom and a blurred background effect
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                width: '100%',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(2, 6, 23, 0.5)', // Transparent dark color
                backdropFilter: 'blur(12px)',           // The "glass" effect
                WebkitBackdropFilter: 'blur(12px)',     // For Safari browser
            }}
        >

            {/* This div centers the content and adds spacing */}
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">

                {/* LEFT SIDE: The Logo */}
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold text-lg">EventScale</span>
                    </Link>
                </div>

                {/* RIGHT SIDE: The Buttons */}
                <div className="flex items-center gap-2">
                    {/* Login Button */}
                    <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                        Login
                    </Link>

                    {/* Sign Up Button (styled like a pill) */}
                    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                        Sign Up
                    </button>
                </div>

            </div>
        </header>
    );
}