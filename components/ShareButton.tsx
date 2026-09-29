'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export function ShareButton({ nombre, oficio, slug }: { nombre: string; oficio: string; slug: string }) {
  const [copiado, setCopiado] = useState(false);

  const url = 'https://oficios-pergamino.vercel.app/profesional/' + slug;
  const texto =
    'Mirá mi perfil en Oficios Pergamino: ' + nombre + ', ' + oficio + '. ' + url;

  async function compartir() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Oficios Pergamino', text: texto, url });
      } catch (err) {
        // la persona canceló, no hacemos nada
      }
      return;
    }
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  return (
    <button type="button" onClick={compartir} className="btn btn-secondary">
      {copiado ? (
        <>
          <Check size={17} /> Copiado
        </>
      ) : (
        <>
          <Share2 size={17} /> Compartir mi perfil
        </>
      )}
    </button>
  );
}