'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Esta é a função que "espera" 300ms antes de agir
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term); // Coloca ?query=termo na URL
        } else {
            params.delete('query'); // Remove se estiver vazio
        }

        // Atualiza a URL sem dar refresh na página
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="w-full max-w-md mx-auto mb-12 relative">
            <input
                type="text"
                placeholder="Search events..."
                className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-purple-500 transition-all"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <span className="absolute right-6 top-4 text-xl">🔍</span>
        </div>
    );
}