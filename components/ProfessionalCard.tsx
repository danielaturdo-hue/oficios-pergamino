'use client';

import Link from 'next/link';
import { MapPin, Star, MessageCircle, Camera } from 'lucide-react';
import type { Professional } from '@/lib/data';
import { nombrePropio, textoLimpio, iniciales, tieneFoto } from '@/lib/format';
import { registrarClic } from '@/lib/clics';

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
  const trabajos = p.workPhotos ? p.workPhotos.length : 0;

  return (
    <article className="card card-hover p-4 flex flex-col gap-4 h-full">
      <div className="flex gap-4">
        {tieneFoto(foto) ? (
          <img src={foto} alt={'Foto de ' + nombre} className="w-20 h-20 rounded-md object-cover shrink-0 bg-[#f3e3e3]" />
        ) : (
          <div
            className="w-20 h-20 rounded-md shrink-0 flex items-center justify-center text-2xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#6b1e2e,#8c3a4a)' }}
            aria-hidden="true"
          >
            {iniciales(nombre)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-lg truncate">{nombre}</h3>
          <p className="font-semibold text-[#6b1e2e] line-clamp-2 text-sm mt-0.5">{oficio}</p>
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
          <span className="pill bg-[#f2e8d3] px-3 py-1 font-semibold">{p.category}</span>
        ) : null}
        {p.years > 0 ? (
          <span className="pill bg-[#f2e8d3] px-3 py-1 font-semibold">
            {p.years === 1 ? '1 año' : p.years + ' años'} de experiencia
          </span>
        ) : null}
        {trabajos > 0 ? (
          <span className="pill bg-[#f2e8d3] px-3 py-1 flex items-center gap-1 font-semibold">
            <Camera size={13} /> {trabajos === 1 ? '1 trabajo con fotos' : trabajos + ' trabajos con fotos'}
          </span>
        ) : null}
        {p.reviews > 0 ? (
          <span className="pill bg-[#f4e6c8] px-3 py-1 flex items-center gap-1">
            <Star size={13} fill="currentColor" /> {p.rating} ({p.reviews})
          </span>
        ) : (
          <span className="pill bg-[#f3e3e3] text-[#6b1e2e] px-3 py-1 font-semibold">Nuevo</span>
        )}
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
              if (!ok) {
                e.preventDefault();
                return;
              }
              registrarClic(p.id, p.category, 'tarjeta');
            }}
          >
            <MessageCircle size={17} /> Contactar
          </a>
        ) : null}
      </div>
    </article>
  );
}
