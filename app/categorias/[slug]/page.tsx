import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import { ProfessionalCard } from '@/components/ProfessionalCard';

export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return notFound();

  const { data } = await supabase
    .from('Profesionales')
    .select('id, created_at, nombre, oficio, telefono, descripcion, localidad, categoria, foto, plan')
    .eq('categoria', c.name);

  const ps = (data || []).map((p: any) => ({
    id: String(p.id),
    slug: 'profesional-' + p.id,
    name: p.nombre || '',
    trade: p.oficio || '',
    category: p.categoria || c.name,
    zone: p.localidad || '',
    description: p.descripcion || '',
    years: 0,
    home: true,
    quotes: true,
    rating: 5,
    reviews: 0,
    jobs: 0,
    available: true,
    services: [],
    hours: '',
    whatsapp: p.telefono || '',
    badges: [],
    photos: [p.foto || '/placeholder-work.svg'],
  }));

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {ps.length ? (
            ps.map((p) => <ProfessionalCard key={p.id} p={p} />)
          ) : (
            <div className="card p-8 md:col-span-2 lg:col-span-3">
              Todavía no hay profesionales en esta categoría. ¡Podés ser el primero!{' '}
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