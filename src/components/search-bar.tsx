'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search events..."
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full py-3 px-6 pr-12 border border-white/10 bg-white/5 text-base outline-none shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out rounded-full"
                />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none">
  🔍
</span>

        </div>

    );
}