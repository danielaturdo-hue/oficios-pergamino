import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { obtenerProfesional } from '@/lib/profesionales';
import { MapPin, ShieldAlert, Camera } from 'lucide-react';
import { ContactButton } from '@/components/ContactButton';
import { ShareButton } from '@/components/ShareButton';
import { ReportButton } from '@/components/ReportButton';
import { nombrePropio, textoLimpio, iniciales, tieneFoto } from '@/lib/format';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await obtenerProfesional(slug.replace('profesional-', ''));
  if (!p) return { title: 'Perfil no encontrado' };

  const nombre = nombrePropio(p.nombre);
  const oficio = textoLimpio(p.oficio);
  const zona = nombrePropio(p.localidad);
  const descripcion = textoLimpio(p.descripcion);

  return {
    title: nombre + ' · ' + oficio + (zona ? ' en ' + zona : ' en Pergamino'),
    description: (descripcion || oficio + ' en Pergamino.').slice(0, 155),
    alternates: { canonical: '/profesional/' + slug },
    ...(tieneFoto(p.foto) ? { openGraph: { images: [p.foto] } } : {}),
  };
}

export default async function Profile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = slug.replace('profesional-', '');

  const p = await obtenerProfesional(id);
  if (!p) return notFound();

  const nombre = nombrePropio(p.nombre);
  const oficio = textoLimpio(p.oficio);
  const zona = nombrePropio(p.localidad);
  const anios = Number(p.anios_experiencia) || 0;
  const trabajos: string[] = Array.isArray(p.fotos_trabajos) ? p.fotos_trabajos.filter(Boolean) : [];

  return (
    <main className="py-8">
      <div className="container max-w-4xl">
        <div className="card overflow-hidden">
          <div className="h-32 bg-[#2f6b52]" />
          <div className="p-6 md:p-8 -mt-12">
            {tieneFoto(p.foto) ? (
              <img src={p.foto} alt={'Foto de ' + nombre} className="w-28 h-28 rounded-3xl object-cover border-4 border-white bg-[#e8f2eb]" />
            ) : (
              <div
                className="w-28 h-28 rounded-3xl border-4 border-white flex items-center justify-center text-4xl font-black text-white"
                style={{ background: 'linear-gradient(135deg,#2f6b52,#4c9474)' }}
              >
                {iniciales(nombre)}
              </div>
            )}
            <div className="mt-4">
              <h1 className="text-3xl font-black">{nombre}</h1>
              <p className="text-xl font-bold text-[#2f6b52]">{oficio}</p>
              {p.localidad ? (
                <p className="muted mt-2 flex items-center gap-1">
                  <MapPin size={16} />
                  {zona}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="pill bg-[#e8f2eb] px-3 py-1 text-sm font-bold">✓ Nuevo en Oficios Pergamino</span>
              {anios > 0 ? (
                <span className="pill bg-[#f1f3f0] px-3 py-1 text-sm font-bold">
                  {anios === 1 ? '1 año' : anios + ' años'} de experiencia
                </span>
              ) : null}
              {trabajos.length > 0 ? (
                <span className="pill bg-[#f1f3f0] px-3 py-1 text-sm font-bold flex items-center gap-1">
                  <Camera size={14} /> {trabajos.length === 1 ? '1 trabajo con fotos' : trabajos.length + ' trabajos con fotos'}
                </span>
              ) : null}
            </div>

            {p.descripcion ? <p className="mt-7 leading-7">{textoLimpio(p.descripcion)}</p> : null}

            {trabajos.length > 0 ? (
              <>
                <h2 className="text-2xl font-black mt-9">Trabajos realizados</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {trabajos.map((src, i) => (
                    <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="block">
                      <img
                        src={src}
                        alt={'Trabajo realizado por ' + nombre + ' (' + (i + 1) + ')'}
                        loading="lazy"
                        className="w-full aspect-square rounded-2xl object-cover bg-[#e8f2eb]"
                      />
                    </a>
                  ))}
                </div>
              </>
            ) : null}

            <div className="bg-[#fff4d2] rounded-2xl p-5 mt-8 flex gap-3">
              <ShieldAlert size={22} className="shrink-0 mt-0.5" />
              <div className="text-sm leading-6">
                <p className="font-black">Antes de contactar</p>
                <p className="mt-1">
                  Oficios Pergamino no verifica identidades ni matrículas. Confirmá con la persona sus datos,
                  su matrícula si el oficio la requiere, pedí presupuesto por escrito y acordá las condiciones
                  antes de contratar. Si algo te resulta sospechoso, no compartas datos personales ni hagas
                  pagos por adelantado, y reportá el perfil. Más{' '}
                  <a href="/seguridad" className="underline font-bold">
                    consejos de seguridad
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <ContactButton
                telefono={p.telefono}
                oficio={p.oficio}
                profesionalId={String(p.id)}
                categoria={p.categoria || ''}
              />
              <ShareButton nombre={p.nombre} oficio={p.oficio} slug={'profesional-' + p.id} />
            </div>

            <h2 className="text-2xl font-black mt-9">Reseñas</h2>
            <p className="muted mt-3">Todavía no tiene reseñas.</p>

            <ReportButton profesionalId={String(p.id)} />
          </div>
        </div>
      </div>
    </main>
  );
}
