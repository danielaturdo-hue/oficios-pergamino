import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function linkWhatsApp(contacto: string, titulo: string) {
  const phone = String(contacto || '').replace(/\D/g, '').replace(/^0+/, '');
  const numero = phone && !phone.startsWith('54') ? '549' + phone : phone;
  if (!numero) return '';
  const mensaje = 'Hola, vi tu pedido en Oficios Pergamino ("' + titulo + '") y quería consultarte.';
  return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensaje);
}

function hace(fecha: string) {
  const dias = Math.floor((Date.now() - new Date(fecha).getTime()) / 86400000);
  if (dias <= 0) return 'Hoy';
  if (dias === 1) return 'Ayer';
  return 'Hace ' + dias + ' días';
}

export default async function Pedidos() {
  const desde = new Date(Date.now() - 30 * 86400000).toISOString();

  const { data } = await supabase
    .from('Solicitudes')
    .select('id, created_at, titulo, categoria, descripcion, zona, fecha_aprox, presupuesto, contacto')
    .eq('aprobada', true)
    .gte('created_at', desde)
    .order('created_at', { ascending: false });

  const pedidos = data || [];

  return (
    <main className="py-10">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-[#2f6b52]">PEDIDOS DE SERVICIOS</p>
          <h1 className="text-4xl font-black mt-2">Personas que necesitan un profesional</h1>
          <p className="muted mt-2">
            Si ofrecés un servicio, mirá qué necesita la gente de Pergamino y escribile directo por WhatsApp.
            Los pedidos se muestran durante 30 días.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Link href="/solicitar" className="btn btn-primary">
            Pedir un servicio
          </Link>
          <Link href="/ofrecer" className="btn btn-secondary">
            Publicar mi oficio
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {pedidos.length ? (
            pedidos.map((p: any) => {
              const link = linkWhatsApp(p.contacto, p.titulo);
              return (
                <article key={p.id} className="card p-6 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 items-center text-xs">
                    <span className="pill bg-[#e8f2eb] px-3 py-1 font-bold">{p.categoria}</span>
                    <span className="muted">{hace(p.created_at)}</span>
                  </div>
                  <h2 className="text-xl font-black">{p.titulo}</h2>
                  <p className="leading-7">{p.descripcion}</p>
                  <p className="text-sm muted">
                    📍 {p.zona}
                    {p.fecha_aprox ? ' · Para: ' + p.fecha_aprox : ''}
                    {p.presupuesto ? ' · Presupuesto: ' + p.presupuesto : ''}
                  </p>
                  {link ? (
                    <a href={link} className="btn btn-primary">
                      Contactar por WhatsApp
                    </a>
                  ) : null}
                </article>
              );
            })
          ) : (
            <div className="card p-8 md:col-span-2">
              Todavía no hay pedidos activos. Si necesitás un servicio, podés{' '}
              <Link href="/solicitar" className="underline font-bold">
                pedirlo acá
              </Link>
              .
            </div>
          )}
        </div>

        <p className="text-sm muted mt-8 max-w-3xl">
          Antes de trabajar con alguien, pedí referencias y acordá el precio y las condiciones por escrito.
          Oficios Pergamino no participa en los acuerdos entre las partes.
        </p>
      </div>
    </main>
  );
}