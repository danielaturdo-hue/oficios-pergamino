'use client';

import { useState } from 'react';
import { MessageCircle, Eye } from 'lucide-react';

export function ContactButton({ telefono, oficio }: { telefono: string; oficio: string }) {
  const [mostrar, setMostrar] = useState(false);
  
  const phone = String(telefono || '').replace(/\D/g, '').replace(/^0+/, '');
  const whatsapp = phone && !phone.startsWith('54') ? '549' + phone : phone;
  if (!whatsapp) return null;

  const message = 'Hola, encontré tu perfil en Oficios Pergamino. Quería consultar por un trabajo de ' + oficio + '.';
  const link = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message);

  if (!mostrar) {
    return (
      <button type="button" onClick={() => setMostrar(true)} className="btn btn-secondary">
        <Eye size={17} /> Mostrar contacto
      </button>
    );
  }
  
  return (
    <a
      href={link}
      className="btn btn-primary"
      onClick={(e) => {
        const ok = confirm(
          'Oficios Pergamino no verifica identidades ni matrículas. Confirmá los datos con la persona, pedí presupuesto por escrito y no compartas datos ni hagas pagos por adelantado antes de contratar.\n\n¿Continuar a WhatsApp?'
        );
        if (!ok) e.preventDefault();
      }}
    >
      <MessageCircle size={17} /> Contactar por WhatsApp
    </a>
  );
}