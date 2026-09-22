import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { MapPin, MessageCircle, Flag, ShieldAlert } from 'lucide-react';

export default async function Profile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = slug.replace('profesional-', '');

  const { data: p } = await supabase
    .from('Profesionales')
    .select('id, created_at, nombre, oficio, telefono, descripcion, localidad, categoria, foto, plan')
    .eq('id', id)
    .maybeSingle();

  if (!p) return notFound();

  const phone = String(p.telefono || '').replace(/\D/g, '').replace(/^0+/, '');
  const whatsapp = phone && !phone.startsWith('54') ? '549' + phone : phone;
  const message = 'Hola, encontré tu perfil en Oficios Pergamino. Quería consultar por un trabajo de ' + p.oficio + '.';
  const link = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message);

  return (
    <main className="py-8">
      <div className="container max-w-4xl">
        <div className="card overflow-hidden">
          <div className="h-32 bg-[#2f6b52]" />
          <div className="p-6 md:p-8 -mt-12">
            <img src={p.foto || '/placeholder-work.svg'} alt="" className="w-28 h-28 rounded-3xl object-cover border-4 border-white" />
            <div className="mt-4">
              <h1 className="text-3xl font-black">{p.nombre}</h1>
              <p className="text-xl font-bold text-[#2f6b52]">{p.oficio}</p>
              {p.localidad ? (
                <p className="muted mt-2 flex items-center gap-1">
                  <MapPin size={16} />
                  {p.localidad}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="pill bg-[#e8f2eb] px-3 py-1 text-sm font-bold">✓ Nuevo en Oficios Pergamino</span>
            </div>

            {p.descripcion ? <p className="mt-7 leading-7">{p.descripcion}</p> : null}

            <div className="bg-[#fff4d2] rounded-2xl p-5 mt-8 flex gap-3">
              <ShieldAlert size={22} className="shrink-0 mt-0.5" />
              <div className="text-sm leading-6">
                <p className="font-black">Antes de contactar</p>
                <p className="mt-1">
                  Oficios Pergamino no verifica identidades ni matrículas. Confirmá con la persona sus datos,
                  su matrícula si el oficio la requiere, pedí presupuesto por escrito y acordá las condiciones
                  antes de contratar. Si algo te resulta sospechoso, no compartas datos personales ni hagas
                  pagos por adelantado, y reportá el perfil.
                </p>
              </div>
            </div>

            {whatsapp ? (
              <a href={link} className="btn btn-primary mt-5 w-full md:w-auto">
                <MessageCircle /> Contactar por WhatsApp
              </a>
            ) : null}

            <h2 className="text-2xl font-black mt-9">Reseñas</h2>
            <p className="muted mt-3">Todavía no tiene reseñas.</p>

            <button className="text-sm muted flex items-center gap-2 mt-6">
              <Flag size={15} /> Reportar perfil
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}