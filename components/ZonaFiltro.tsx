import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Zona } from '@/lib/profesionales';

// Filtro por zona con enlaces comunes: funciona sin JavaScript y conserva el resto de la búsqueda.
export function ZonaFiltro({
  zonas,
  activa,
  base,
  params = {},
}: {
  zonas: Zona[];
  activa: string;
  base: string;
  params?: Record<string, string | undefined>;
}) {
  if (zonas.length < 2 && !activa) return null;

  const href = (clave: string) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
    if (clave) sp.set('zona', clave);
    const qs = sp.toString();
    return base + (qs ? '?' + qs : '');
  };

  const chip = (activo: boolean) =>
    'pill px-4 py-2 text-sm font-semibold border transition ' +
    (activo ? 'bg-[#2f6b52] text-white border-[#2f6b52]' : 'bg-white border-[#d5e3d9] hover:bg-[#e8f2eb]');

  return (
    <nav aria-label="Filtrar por zona" className="mt-6">
      <p className="text-xs font-black text-[#2f6b52] flex items-center gap-1 mb-2">
        <MapPin size={13} /> ZONA
      </p>
      <div className="flex flex-wrap gap-2">
        <Link href={href('')} className={chip(!activa)} aria-current={!activa ? 'true' : undefined}>
          Toda la ciudad
        </Link>
        {zonas.map((z) => (
          <Link key={z.clave} href={href(z.clave)} className={chip(activa === z.clave)} aria-current={activa === z.clave ? 'true' : undefined}>
            {z.nombre} ({z.cantidad})
          </Link>
        ))}
      </div>
    </nav>
  );
}
