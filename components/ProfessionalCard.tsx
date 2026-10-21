'use client';

import Link from 'next/link';
import { MapPin, Star, MessageCircle, CheckCircle2 } from 'lucide-react';
import type { Professional } from '@/lib/data';
import { nombrePropio, textoLimpio, iniciales, tieneFoto } from '@/lib/format';

export function ProfessionalCard({ p }: { p: Professional }) {
  const phone = String(p.whatsapp || '').replace(/\D/g, '').replace(/^0+/, '');
  const whatsapp = phone && !phone.startsWith('54') ? '549' + phone : phone;
  const message = 'Hola, encontré tu perfil en Oficios Pergamino. Quería consultar por un trabajo de ' + p.trade + '.';
  const link = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message);

  const nombre = nombrePropio(p.name);
  const oficio = textoLimpio(p.trade);
  const zona = nombrePropio(p.zone);
  const descripcion = textoLimpio(p.description);
  const foto = p.photos[0];

  return (
    <article className="card card-hover p-4 flex flex-col gap-4 h-full">
      <div className="flex gap-4">
        {tieneFoto(foto) ? (
          <img src={foto} alt={'Foto de ' + nombre} className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-[#e8f2eb]" />
        ) : (
          <div
            className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center text-2xl font-black text-white"
            style={{ background: 'linear-gradient(135deg,#2f6b52,#4c9474)' }}
            aria-hidden="true"
          >
            {iniciales(nombre)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex gap-2 items-center">
            <h3 className="font-black text-lg truncate">{nombre}</h3>
            {p.badges.includes('WhatsApp verificado') ? (
              <CheckCircle2 size={16} className="text-[#2f6b52] shrink-0" />
            ) : null}
          </div>
          <p className="font-semibold text-[#2f6b52] line-clamp-1 text-sm mt-0.5">{oficio}</p>
          {zona ? (
            <p className="text-sm muted flex items-center gap-1 mt-1">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{zona}</span>
            </p>
          ) : null}
        </div>
      </div>

      <p className="text-sm leading-6 line-clamp-3 flex-1">{descripcion}</p>

      <div className="flex flex-wrap gap-2 text-xs">
        {p.category && p.category !== 'General' ? (
          <span className="pill bg-[#f1f3f0] px-3 py-1 font-semibold">{p.category}</span>
        ) : null}
        {p.reviews > 0 ? (
          <span className="pill bg-[#fff4d2] px-3 py-1 flex items-center gap-1">
            <Star size={13} fill="currentColor" /> {p.rating} ({p.reviews})
          </span>
        ) : (
          <span className="pill bg-[#e8f2eb] text-[#2f6b52] px-3 py-1 font-semibold">Nuevo</span>
        )}
        {p.jobs > 0 ? <span className="pill bg-[#f1f3f0] px-3 py-1">{p.jobs} trabajos</span> : null}
      </div>

      <div className="flex gap-2">
        <Link href={'/profesional/' + p.slug} className="btn btn-secondary flex-1">
          Ver perfil
        </Link>
        {whatsapp ? (
          <a
            className="btn btn-whatsapp flex-1"
            href={link}
            onClick={(e) => {
              const ok = confirm(
                'Oficios Pergamino no verifica identidades ni matrículas. Confirmá los datos con la persona, pedí presupuesto por escrito y no compartas datos ni hagas pagos por adelantado antes de contratar.\n\n¿Continuar a WhatsApp?'
              );
              if (!ok) e.preventDefault();
            }}
          >
            <MessageCircle size={17} /> Contactar
          </a>
        ) : null}
      </div>
    </article>
  );
}
