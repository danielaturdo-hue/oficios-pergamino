'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SearchBox({ initial = '', zona = '' }: { initial?: string; zona?: string }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        const sp = new URLSearchParams({ q });
        if (zona) sp.set('zona', zona);
        router.push('/buscar?' + sp.toString());
      }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 muted" size={20} />
        <input
          aria-label="Qué necesitás"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ej: albañil, costurera, electricista…"
          className="w-full rounded-2xl border border-[#ddd7cb] bg-white px-12 py-4 outline-none focus:ring-2 focus:ring-[#2f6b52]"
        />
      </div>
      <button className="btn btn-primary px-8">Buscar</button>
    </form>
  );
}
