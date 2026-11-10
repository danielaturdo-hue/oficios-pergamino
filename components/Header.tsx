'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', texto: 'Inicio' },
  { href: '/buscar', texto: 'Buscar' },
  { href: '/solicitar', texto: 'Pedir un servicio' },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-[#e6d9c3] bg-[#fbf5e9]/90 backdrop-blur">
      <nav className="container flex items-center justify-between gap-4 h-16">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold text-xl shrink-0">
          <span className="text-2xl" aria-hidden="true">🧰</span>
          <span>
            Oficios <span className="text-[#6b1e2e]">Pergamino</span>
          </span>
          <span className="pill bg-[#c8963e] text-[#2b1a1d] text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide">
            Beta
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                'hidden sm:inline-block px-3 py-2 rounded text-sm font-semibold transition hover:bg-[#f3e3e3] ' +
                (pathname === l.href ? 'bg-[#f3e3e3] text-[#6b1e2e]' : '')
              }
            >
              {l.texto}
            </Link>
          ))}
          <Link href="/ofrecer" className="btn btn-primary !py-2 !px-4 text-sm">
            Ofrezco un oficio
          </Link>
        </div>
      </nav>
    </header>
  );
}
