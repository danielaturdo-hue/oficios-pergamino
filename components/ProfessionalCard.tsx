'use client';

import Link from 'next/link';
import { MapPin, Star, MessageCircle, CheckCircle2 } from 'lucide-react';
import type { Professional } from '@/lib/data';

export function ProfessionalCard({ p }: { p: Professional }) {
  const phone = String(p.whatsapp || '').replace(/\D/g, '').replace(/^0+/, '');
  const whatsapp = phone && !phone.startsWith('54') ? '549' + phone : phone;
  const message = 'Hola, encontré tu perfil en Oficios Pergamino. Quería consultar por un trabajo de ' + p.trade + '.';
  const link = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message);

  return (
    <article className="card p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <img src={p.photos[0]} alt="" className="w-20 h-20 rounded-2xl object-cover" />
        <div className="min-w-0">
          <div className="flex gap-2 items-center">
            <h3 className="font-black text-lg">{p.name}</h3>
            {p.badges.includes('WhatsApp verificado') ? (
              <CheckCircle2 size={16} className="text-[#2f6b52]" />
            ) : null}
          </div>
          <p className="font-semibold text-[#2f6b52]">{p.trade}</p>
          <p className="text-sm muted flex items-center gap-1">
            <MapPin size={14} />
            {p.zone}
          </p>
        </div>
      </div>

      <p className="text-sm leading-6">{p.description}</p>

      <div className="flex flex-wrap gap-2 text-xs">
        {p.reviews > 0 ? (
          <span className="pill bg-[#fff4d2] px-3 py-1 flex items-center gap-1">
            <Star size={13} fill="currentColor" /> {p.rating} ({p.reviews})
          </span>
        ) : (
          <span className="pill bg-[#e8f2eb] px-3 py-1">Nuevo</span>
        )}
        {p.jobs > 0 ? <span className="pill bg-[#f1f3f0] px-3 py-1">{p.jobs} trabajos</span> : null}
      </div>

      <div className="flex gap-2">
        <Link href={'/profesional/' + p.slug} className="btn btn-secondary flex-1">
          Ver perfil
        </Link>
        {whatsapp ? (
          <a
            className="btn btn-primary flex-1"
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