import Link from 'next/link';
import type { Metadata } from 'next';
import { synonyms } from '@/lib/data';
import { listarProfesionales, zonasDe, claveZona } from '@/lib/profesionales';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { SearchBox } from '@/components/SearchBox';
import { ZonaFiltro } from '@/components/ZonaFiltro';

export const dynamic = 'force-dynamic';

type Params = { q?: string; category?: string; zona?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<Params> }): Promise<Metadata> {
  const sp = await searchParams;
  const q = (sp.q || '').trim();
  if (q) {
    return {
      title: q + ' en Pergamino',
      description: 'Resultados para “' + q + '” en Pergamino. Mirá perfiles y contactá directo por WhatsApp.',
      robots: { index: false, follow: true },
    };
  }
  return {
    title: 'Buscar oficios y servicios en Pergamino',
    description:
      'Buscá plomeros, electricistas, pintores, costureras y otros profesionales de Pergamino por oficio y por zona. Contacto directo por WhatsApp.',
  };
}

function match(q: string, p: any) {
  if (!q) return true;
  const s = q.toLowerCase();
  const words = [
    p.name,
    p.trade,
    p.category,
    p.description,
    ...p.services,
    ...Object.entries(synonyms)
      .filter(([k, v]) => [k, ...v].some((x) => s.includes(x)))
      .map(([k]) => k),
  ]
    .join(' ')
    .toLowerCase();
  return (
    s.split(/\s+/).every((w) => words.includes(w)) ||
    Object.values(synonyms)
      .flat()
      .some((x) => s.includes(x) && words.includes(x))
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<Params> }) {
  const sp = await searchParams;
  const q = sp.q || '';
  const zonaSel = claveZona(sp.zona || '');

  const todos = await listarProfesionales();

  // Primero se aplica la búsqueda y la categoría; las zonas se arman con ese resultado.
  const coinciden = todos.filter(
    (p) => match(q, p) && (sp.category ? !p.category.localeCompare(sp.category) : true)
  );
  const zonas = zonasDe(coinciden);
  const filtered = zonaSel ? coinciden.filter((p) => claveZona(p.zone) === zonaSel) : coinciden;

  return (
    <main className="py-10">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-[#6b1e2e]">BUSCAR EN PERGAMINO</p>
          <h1 className="text-4xl font-semibold mt-2">{q ? `Resultados para “${q}”` : 'Encontrá un oficio'}</h1>
          <div className="mt-6">
            <SearchBox initial={q} zona={zonaSel} />
          </div>
        </div>

        <ZonaFiltro zonas={zonas} activa={zonaSel} base="/buscar" params={{ q: q || undefined, category: sp.category }} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filtered.map((p) => (
            <ProfessionalCard key={p.id} p={p} />
          ))}
        </div>

        {!filtered.length && (
          <div className="card p-10 text-center mt-8">
            <div className="text-5xl">🔎</div>
            <h2 className="text-2xl font-semibold mt-4">Todavía no encontramos a alguien</h2>
            <p className="muted mt-2">
              {zonaSel
                ? 'Probá con otra zona o buscá en toda la ciudad.'
                : 'Probá con “plomero”, “arreglar ropa” o “pintar mi casa”.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link href="/solicitar" className="btn btn-primary">
                Pedir este servicio
              </Link>
              {zonaSel || q ? (
                <Link href="/buscar" className="btn btn-secondary">
                  Ver todos los profesionales
                </Link>
              ) : null}
            </div>
            <p className="text-sm muted mt-4">
              Contanos qué necesitás y los profesionales de la zona podrán escribirte.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
