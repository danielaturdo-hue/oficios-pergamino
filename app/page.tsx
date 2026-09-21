import Link from 'next/link';
import { ArrowRight, ShieldCheck, Users, Search } from 'lucide-react';
import { SearchBox } from '@/components/SearchBox';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data } = await supabase
    .from('Profesionales')
    .select('id, created_at, nombre, oficio, telefono, descripcion, localidad, categoria, foto, plan')
    .order('created_at', { ascending: false })
    .limit(4);

  const nuevos = (data || []).map((p: any) => ({
    id: String(p.id),
    slug: 'profesional-' + p.id,
    name: p.nombre || '',
    trade: p.oficio || '',
    category: p.categoria || 'General',
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
    <main>
      <section className="bg-[#e8f2eb] py-14 md:py-24">
        <div className="container grid md:grid-cols-[1.15fr_.85fr] gap-10 items-center">
          <div>
            <span className="pill inline-block bg-white px-4 py-2 text-sm font-bold text-[#2f6b52]">
              📍 Pergamino, Buenos Aires
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-5 leading-[1.05]">
              Encontrá a la persona que necesitás, <span className="text-[#2f6b52]">cerca tuyo.</span>
            </h1>
            <p className="text-lg md:text-xl muted mt-5 max-w-xl">
              Oficios y servicios de Pergamino, en un solo lugar.
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
            <div className="mt-4">
              <Link href="/ofrecer" className="btn btn-yellow">
                + Ofrezco un oficio
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="card p-7">
              <div className="text-6xl">🧰</div>
              <h2 className="text-2xl font-black mt-5">Lo que necesitás.</h2>
              <p className="muted mt-2">
                Una persona de confianza para resolver ese trabajo que venís postergando.
              </p>
              <div className="mt-6 space-y-3">
                <div className="bg-[#f7f4ed] rounded-xl p-4">🔧 “Necesito un plomero”</div>
                <div className="bg-[#f7f4ed] rounded-xl p-4">🧵 “¿Quién arregla ropa?”</div>
                <div className="bg-[#f7f4ed] rounded-xl p-4">🎨 “Quiero pintar mi casa”</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-bold text-[#2f6b52]">EXPLORÁ</p>
              <h2 className="text-3xl font-black">¿Qué necesitás?</h2>
            </div>
            <Link href="/buscar" className="font-bold text-[#2f6b52]">
              Ver todo <ArrowRight size={16} className="inline" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.slice(0, 18).map((c) => (
              <Link
                key={c.name}
                href={'/categorias/' + c.slug}
                className="card p-4 hover:-translate-y-1 transition"
              >
                <div className="text-3xl">{c.icon}</div>
                <div className="font-bold text-sm mt-3">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="container">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-bold text-[#2f6b52]">NUEVOS</p>
              <h2 className="text-3xl font-black">Últimos en sumarse</h2>
            </div>
            <Link href="/buscar" className="font-bold text-[#2f6b52]">
              Ver todos <ArrowRight size={16} className="inline" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nuevos.length ? (
              nuevos.map((p) => <ProfessionalCard key={p.id} p={p} />)
            ) : (
              <div className="card p-8 md:col-span-2 lg:col-span-4">
                Todavía no hay profesionales. ¡Podés ser el primero!{' '}
                <Link href="/ofrecer" className="underline font-bold">
                  Publicá tu oficio
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid md:grid-cols-2 gap-5">
          <div className="card p-8" style={{ background: '#2f6b52', color: '#ffffff' }}>
            <div className="text-4xl">🛠️</div>
            <h2 className="text-3xl font-black mt-4" style={{ color: '#ffffff' }}>
              ¿Tenés un oficio?
            </h2>
            <p className="mt-3" style={{ color: '#e8f2eb' }}>
              Mostrá lo que hacés y encontrá personas de Pergamino que necesitan tus servicios.
            </p>
            <Link href="/ofrecer" className="btn btn-yellow mt-6">
              Publicar mi oficio <ArrowRight size={17} />
            </Link>
          </div>
          <div className="card p-8">
            <h2 className="text-3xl font-black">¿Necesitás contratar un servicio?</h2>
            <p className="muted mt-3">
              Contanos qué necesitás y profesionales de la zona podrán contactarte.
            </p>
            <Link href="/solicitar" className="btn btn-primary mt-6">
              Pedir un servicio <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Search className="mx-auto text-[#2f6b52]" />
            <h3 className="font-black mt-3">Buscá</h3>
            <p className="muted text-sm mt-1">Por oficio, servicio o necesidad.</p>
          </div>
          <div>
            <Users className="mx-auto text-[#2f6b52]" />
            <h3 className="font-black mt-3">Elegí</h3>
            <p className="muted text-sm mt-1">Mirá perfiles, zonas y fotos.</p>
          </div>
          <div>
            <ShieldCheck className="mx-auto text-[#2f6b52]" />
            <h3 className="font-black mt-3">Contactá</h3>
            <p className="muted text-sm mt-1">Directo por WhatsApp.</p>
          </div>
        </div>
      </section>
    </main>
  );
}