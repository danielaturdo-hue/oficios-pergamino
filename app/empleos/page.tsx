import Link from 'next/link';
import { ArrowUpRight, Briefcase, ShieldAlert, Store } from 'lucide-react';
import { empleos, buscadores } from '@/lib/empleos';

export const metadata = {
  title: 'Empleos en Pergamino | Oficios Pergamino',
  description:
    'Avisos de trabajo en Pergamino y búsquedas listas en LinkedIn, Bumeran, Computrabajo y Google Empleos. Si tu comercio busca personal, publicá tu aviso.',
};

const mailComercio =
  'mailto:oficios.pergamino@gmail.com?subject=' +
  encodeURIComponent('Quiero publicar un aviso de empleo') +
  '&body=' +
  encodeURIComponent('Hola, mi comercio busca personal. Puesto: \nComercio: \nTeléfono de contacto: ');

export default function Empleos() {
  return (
    <main>
      <section className="hero-bg py-12 md:py-16">
        <div className="container">
          <span className="pill inline-block bg-white px-4 py-2 text-sm font-bold text-[#2f6b52]">
            💼 Trabajo en Pergamino
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-5 leading-[1.05]">
            Empleos en <span className="text-[#2f6b52]">Pergamino</span>
          </h1>
          <p className="text-lg muted mt-4 max-w-2xl">
            Avisos de la ciudad y búsquedas ya armadas en los principales portales, todo en un solo lugar.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <p className="text-sm font-bold text-[#2f6b52]">BUSCÁ DIRECTO</p>
          <h2 className="text-3xl font-black mb-6">Ver empleos en Pergamino</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {buscadores.map((b) => (
              <a
                key={b.nombre}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="card card-hover p-5 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-black">{b.nombre}</p>
                  <p className="text-sm muted mt-1">{b.descripcion}</p>
                </div>
                <ArrowUpRight size={20} className="text-[#2f6b52] shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container">
          <p className="text-sm font-bold text-[#2f6b52]">AVISOS</p>
          <h2 className="text-3xl font-black mb-6">Avisos destacados</h2>

          {empleos.length ? (
            <div className="grid md:grid-cols-2 gap-4">
              {empleos.map((e) => (
                <article key={e.url} className="card card-hover p-5 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#e8f2eb] text-[#2f6b52] flex items-center justify-center shrink-0">
                      <Briefcase size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-lg leading-snug">{e.puesto}</h3>
                      <p className="muted text-sm mt-0.5">{e.empresa}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="pill bg-[#f1f3f0] px-3 py-1 font-semibold">{e.fuente}</span>
                    {e.fecha ? <span className="pill bg-[#fff4d2] px-3 py-1">{e.fecha}</span> : null}
                  </div>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn btn-primary mt-auto"
                  >
                    Ver aviso original <ArrowUpRight size={17} />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-3xl" aria-hidden="true">💼</p>
              <p className="font-black text-lg mt-3">Estamos cargando los primeros avisos</p>
              <p className="muted mt-2 max-w-xl mx-auto">
                Mientras tanto, usá las búsquedas de arriba. Si tu comercio necesita personal, publicá tu aviso acá.
              </p>
            </div>
          )}

          <p className="text-xs muted mt-4">
            Los avisos pertenecen a cada empresa o portal. Oficios Pergamino solo enlaza al aviso original y no
            participa de la selección de personal.
          </p>
        </div>
      </section>

      <section className="pb-14">
        <div className="container grid md:grid-cols-2 gap-5">
          <div className="card p-8" style={{ background: '#2f6b52', color: '#ffffff' }}>
            <Store size={30} />
            <h2 className="text-2xl font-black mt-4" style={{ color: '#ffffff' }}>
              ¿Tu comercio busca personal?
            </h2>
            <p className="mt-3" style={{ color: '#e8f2eb' }}>
              Publicá tu aviso y llegá a gente de Pergamino. Escribinos y lo cargamos.
            </p>
            <a href={mailComercio} className="btn btn-yellow mt-6">
              Publicar un aviso <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="card p-8">
            <ShieldAlert size={30} className="text-[#2f6b52]" />
            <h2 className="text-2xl font-black mt-4">Cuidado con las estafas</h2>
            <p className="muted mt-3 leading-7">
              Ninguna empresa seria te pide plata para darte un trabajo. Verificá siempre la empresa antes de
              compartir tus datos personales.
            </p>
            <Link href="/seguridad" className="btn btn-secondary mt-6">
              Ver consejos de seguridad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
