'use client';

import { useState } from 'react';
import { Flag } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const MOTIVOS = [
  'Datos o fotos falsos',
  'Intento de estafa o pedido de pago adelantado',
  'Contenido inapropiado',
  'El número no corresponde a la persona',
  'Otro motivo',
];

export function ReportButton({ profesionalId }: { profesionalId: string }) {
  const [abierto, setAbierto] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [detalle, setDetalle] = useState('');
  const [estado, setEstado] = useState<'inicial' | 'enviando' | 'enviado' | 'error'>('inicial');

  if (estado === 'enviado') {
    return (
      <p className="text-sm mt-6 flex items-center gap-2 text-[#2f6b52] font-semibold" role="status">
        <Flag size={15} /> Gracias. Vamos a revisar este perfil.
      </p>
    );
  }

  if (!abierto) {
    return (
      <button type="button" onClick={() => setAbierto(true)} className="text-sm muted flex items-center gap-2 mt-6 underline">
        <Flag size={15} /> Reportar perfil
      </button>
    );
  }

  return (
    <form
      className="card p-5 mt-6 space-y-3 max-w-lg"
      onSubmit={async (e) => {
        e.preventDefault();
        setEstado('enviando');
        const { error } = await supabase.from('Reportes').insert([
          {
            profesional_id: Number(profesionalId),
            motivo,
            detalle: detalle.trim() || null,
          },
        ]);
        setEstado(error ? 'error' : 'enviado');
      }}
    >
      <p className="font-black">Reportar este perfil</p>
      <label className="block text-sm font-semibold" htmlFor="motivo-reporte">
        ¿Qué pasó?
      </label>
      <select
        id="motivo-reporte"
        required
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        className="border rounded-xl p-3 w-full"
      >
        <option value="">Elegí un motivo</option>
        {MOTIVOS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <textarea
        maxLength={500}
        placeholder="Contanos más (opcional). No escribas datos personales tuyos."
        value={detalle}
        onChange={(e) => setDetalle(e.target.value)}
        className="border rounded-xl p-3 w-full min-h-24"
        aria-label="Detalle del reporte"
      />
      {estado === 'error' ? (
        <p className="text-sm text-red-700" role="alert">
          No pudimos enviar el reporte. Probá de nuevo o escribinos a oficios.pergamino@gmail.com.
        </p>
      ) : null}
      <div className="flex gap-2">
        <button disabled={estado === 'enviando'} className="btn btn-primary">
          {estado === 'enviando' ? 'Enviando...' : 'Enviar reporte'}
        </button>
        <button type="button" onClick={() => setAbierto(false)} className="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
}
