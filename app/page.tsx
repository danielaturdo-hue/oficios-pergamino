import Link from 'next/link';
import { ArrowRight, ShieldCheck, Users, Search, MessageCircle, Plus } from 'lucide-react';
import { SearchBox } from '@/components/SearchBox';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const META_PROFESIONALES = 30;

const preguntas = [
  {
    q: '¿Cuesta algo usar Oficios Pergamino?',
    a: 'No. Buscar profesionales y publicar tu oficio es gratis durante esta etapa beta.',
  },
  {
    q: '¿Cómo sé si una persona es confiable?',
    a: 'Oficios Pergamino no verifica identidades ni matrículas. Mirá el perfil y las fotos, pedí referencias, solicitá presupuesto por escrito y no hagas pagos por adelantado. Leé nuestros consejos de seguridad.',
  },
  {
    q: '¿Cómo me sumo como profesional?',
    a: 'Tocá "Ofrezco un oficio", completá el formulario con tu foto y tu WhatsApp, y tu perfil aparece en el sitio.',
  },
  {
    q: '¿Cómo contacto a alguien?',
    a: 'Directo por WhatsApp, sin intermediarios. Desde el perfil tocás "Contactar" y se abre la conversación con un mensaje ya escrito.',
  },
];

const atajos = [
  { icon: '🔧', texto: 'Necesito un plomero', href: '/categorias/plomeria' },
  { icon: '🧵', texto: '¿Quién arregla ropa?', href: '/categorias/costura-confeccion' },
  { icon: '🎨', texto: 'Quiero pintar mi casa', href: '/categorias/pintura' },
];

export default async function Home() {
  const { data } = await supabase
    .from('Profesionales')
    .select('id, created_at, nombre, oficio, telefono, descripcion, localidad, categoria, foto, plan')
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: todos } = await supabase.from('Profesionales').select('id');
  const total = todos ? todos.length : 0;

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
      <section className="hero-bg py-12 md:py-24">
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
            <div className="mt-4 flex flex-wrap gap-2 md:hidden">
              {atajos.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="pill bg-white border border-[#d5e3d9] px-4 py-2 text-sm font-semibold"
                >
                  {a.icon} {a.texto}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/ofrecer" className="btn btn-yellow">
                <Plus size={17} /> Ofrezco un oficio
              </Link>
              <span className="text-sm muted flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#2f6b52]" /> Gratis · Contacto directo por WhatsApp
              </span>
            </div>
            {total >= 5 ? (
              <div className="mt-6 max-w-sm">
                <p className="font-bold text-sm text-[#2f6b52]">
                  ✅ {total} profesionales ya se sumaron
                </p>
                {total < META_PROFESIONALES ? (
                  <>
                    <div className="mt-2 h-2.5 rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#2f6b52]"
                        style={{ width: Math.round((total / META_PROFESIONALES) * 100) + '%' }}
                      />
                    </div>
                    <p className="text-xs muted mt-1.5">
                      Faltan {META_PROFESIONALES - total} para llegar a {META_PROFESIONALES}. ¡Sumate gratis!
                    </p>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="hidden md:block">
            <div className="card p-8 shadow-xl" style={{ background: '#2f6b52', color: '#ffffff' }}>
              <div className="text-5xl">🧰</div>
              <h2 className="text-3xl font-black mt-5" style={{ color: '#ffffff' }}>
                ¿Qué necesitás resolver?
              </h2>
              <p className="mt-2" style={{ color: '#e8f2eb' }}>
                Elegí una opción o escribí arriba lo que buscás.
              </p>
              <div className="mt-6 space-y-3">
                {atajos.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="flex items-center justify-between rounded-xl p-4 font-bold hover:-translate-y-1 transition"
                    style={{ background: '#ffffff', color: '#1f2d26' }}
                  >
                    <span>
                      {a.icon} {a.texto}
                    </span>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-[#e7e2d8]">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { n: 1, icon: <Search size={22} />, t: 'Buscá', d: 'Por oficio, servicio o necesidad.' },
            { n: 2, icon: <Users size={22} />, t: 'Elegí', d: 'Mirá perfiles, zonas y fotos.' },
            { n: 3, icon: <MessageCircle size={22} />, t: 'Contactá', d: 'Directo por WhatsApp, sin intermediarios.' },
          ].map((paso) => (
            <div key={paso.n} className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#e8f2eb] text-[#2f6b52] flex items-center justify-center">
                {paso.icon}
              </div>
              <div>
                <p className="text-xs font-black text-[#2f6b52]">PASO {paso.n}</p>
                <h3 className="font-black text-lg leading-tight">{paso.t}</h3>
                <p className="muted text-sm mt-1">{paso.d}</p>
              </div>
            </div>
          ))}
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
                className="card card-hover p-4"
              >
                <div className="text-3xl" aria-hidden="true">{c.icon}</div>
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
        <div className="container">
          <Link
            href="/empleos"
            className="card card-hover p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-bold text-[#2f6b52]">NUEVO</p>
              <h2 className="text-2xl md:text-3xl font-black mt-1">💼 Empleos en Pergamino</h2>
              <p className="muted mt-2">
                Avisos de trabajo de la ciudad y búsquedas listas en LinkedIn, Bumeran y más.
              </p>
            </div>
            <span className="btn btn-primary shrink-0">
              Ver empleos <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="container max-w-3xl">
          <div className="card p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src="/daniela.jpg"
              alt="Daniela Turdó Giacomelli"
              className="w-32 h-32 rounded-3xl object-cover shrink-0 border-4 border-[#e8f2eb]"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-[#2f6b52]">QUIÉN ESTÁ DETRÁS</p>
              <h2 className="text-2xl font-black mt-1">Licenciada Daniela Turdó Giacomelli</h2>
              <p className="muted text-sm mt-1">
                Licenciada en Administración de Empresas (BYU-Idaho) · Pergamino, Buenos Aires
              </p>
              <p className="mt-4 leading-7">
                Armé Oficios Pergamino para que encontrar a alguien de confianza en la ciudad sea simple, y para
                que quienes tienen un oficio sean más fáciles de encontrar. Si tenés una sugerencia o querés
                sumarte, escribime.
              </p>
              <a
                href="mailto:oficios.pergamino@gmail.com"
                className="btn btn-secondary mt-4 !py-2 !px-4 text-sm"
              >
                Escribime
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-3xl">
          <p className="text-sm font-bold text-[#2f6b52]">PREGUNTAS FRECUENTES</p>
          <h2 className="text-3xl font-black mb-6">Antes de empezar</h2>
          <div className="space-y-3">
            {preguntas.map((f) => (
              <details key={f.q} className="card px-5 py-4">
                <summary className="flex items-center justify-between gap-4 font-bold">
                  {f.q}
                  <span className="faq-icon text-2xl text-[#2f6b52] transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="muted mt-3 leading-7 text-sm">
                  {f.a}{' '}
                  {f.q.includes('confiable') ? (
                    <Link href="/seguridad" className="underline font-bold text-[#2f6b52]">
                      Ver consejos de seguridad
                    </Link>
                  ) : null}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
