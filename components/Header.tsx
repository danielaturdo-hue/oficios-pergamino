'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', texto: 'Inicio' },
  { href: '/buscar', texto: 'Buscar' },
  { href: '/empleos', texto: 'Empleos' },
  { href: '/pedidos', texto: 'Pedidos' },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-[#e7e2d8] bg-[#fffaf0]/90 backdrop-blur">
      <nav className="container flex items-center justify-between gap-4 h-16">
        <Link href="/" className="flex items-center gap-2 font-black text-lg shrink-0">
          <span className="text-2xl" aria-hidden="true">🧰</span>
          <span>
            Oficios <span className="text-[#2f6b52]">Pergamino</span>
          </span>
          <span className="pill bg-[#f4c95d] text-[#2d2b22] text-[10px] font-black px-2 py-0.5 uppercase tracking-wide">
            Beta
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                'hidden sm:inline-block px-3 py-2 rounded-xl text-sm font-semibold transition hover:bg-[#e8f2eb] ' +
                (pathname === l.href ? 'bg-[#e8f2eb] text-[#2f6b52]' : '')
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
