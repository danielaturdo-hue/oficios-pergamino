import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { categories } from '@/lib/data';
import { listarProfesionales, zonasDe, claveZona } from '@/lib/profesionales';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { ZonaFiltro } from '@/components/ZonaFiltro';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return { title: 'Categoría no encontrada' };
  return {
    title: c.name + ' en Pergamino',
    description:
      'Profesionales de ' +
      c.name.toLowerCase() +
      ' en Pergamino. Mirá perfiles, zonas y trabajos realizados, y contactá directo por WhatsApp.',
    alternates: { canonical: '/categorias/' + c.slug },
  };
}

export default async function Category({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ zona?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return notFound();

  const zonaSel = claveZona(sp.zona || '');
  const todos = await listarProfesionales({ categoria: c.name });
  const zonas = zonasDe(todos);
  const ps = zonaSel ? todos.filter((p) => claveZona(p.zone) === zonaSel) : todos;

  return (
    <main className="py-10">
      <div className="container">
        <div className="max-w-3xl">
          <span className="text-5xl">{c.icon}</span>
          <h1 className="text-4xl font-black mt-4">{c.name} en Pergamino</h1>
          <p className="muted text-lg mt-2">
            Encontrá profesionales y servicios de {c.name.toLowerCase()} en Pergamino.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Link href="/solicitar" className="btn btn-primary">
            Publicar un trabajo
          </Link>
          <Link href="/buscar" className="btn btn-secondary">
            Buscar en todo Pergamino
          </Link>
        </div>

        <ZonaFiltro zonas={zonas} activa={zonaSel} base={'/categorias/' + c.slug} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {ps.length ? (
            ps.map((p) => <ProfessionalCard key={p.id} p={p} />)
          ) : (
            <div className="card p-8 md:col-span-2 lg:col-span-3">
              {zonaSel
                ? 'No hay profesionales de esta categoría en esa zona todavía. Probá con otra zona o con toda la ciudad.'
                : 'Todavía no hay profesionales en esta categoría. ¡Podés ser el primero!'}{' '}
              <Link href="/ofrecer" className="underline font-bold">
                Publicá tu oficio
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
