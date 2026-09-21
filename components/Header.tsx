'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header>
      <nav className="flex gap-6 p-4">
        <Link href="/">Inicio</Link>
        <Link href="/pedidos">Pedidos</Link>
        <Link href="/ofrecer">Ofrezco un oficio</Link>
      </nav>
    </header>
  );
}