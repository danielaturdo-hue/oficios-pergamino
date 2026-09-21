'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export default function Request() {
  const [done, setDone] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [zona, setZona] = useState('');
  const [fecha, setFecha] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [contacto, setContacto] = useState('');

  if (done) {
    return (
      <main className="py-16">
        <div className="container max-w-xl">
          <div className="card p-10 text-center">
            <div className="text-6xl">📣</div>
            <h1 className="text-3xl font-black mt-4">Recibimos tu pedido</h1>
            <p className="muted mt-2">
              Lo vamos a revisar y, una vez aprobado, aparece en la sección Pedidos durante 30 días, para que
              profesionales te contacten por WhatsApp. El sitio está en etapa de prueba, así que no podemos
              asegurar que recibas respuesta.
            </p>
            <Link href="/buscar" className="btn btn-primary mt-6">
              Buscar profesionales
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="container max-w-3xl">
        <p className="text-sm font-bold text-[#2f6b52]">NECESITO CONTRATAR UN SERVICIO</p>
        <h1 className="text-4xl font-black mt-2">¿Qué necesitás resolver?</h1>
        <p className="muted mt-2">
          Este formulario es para quien necesita contratar a un profesional. También podés buscar directamente
          en la sección de profesionales.
        </p>
        <p className="mt-3 text-sm">
          ¿Ofrecés un servicio o buscás trabajo?{' '}
          <Link href="/ofrecer" className="underline font-bold">
            Publicá tu oficio acá
          </Link>
          .
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setEnviando(true);

            const { error } = await supabase.from('Solicitudes').insert([
              {
                titulo: titulo,
                categoria: categoria,
                descripcion: descripcion,
                zona: zona,
                fecha_aprox: fecha,
                presupuesto: presupuesto,
                contacto: contacto,
                acepto_terminos_at: new Date().toISOString(),
              },
            ]);

            if (error) {
              alert(error.message);
              setEnviando(false);
              return;
            }

            setDone(true);
          }}
          className="card p-6 md:p-8 mt-7 space-y-5"
        >
          <input
            required
            placeholder="Título: ej. Necesito arreglar una campera"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border rounded-xl p-3 w-full"
          />
          <select
            required
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border rounded-xl p-3 w-full"
          >
            <option value="">Categoría</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <textarea
            required
            placeholder="Describí el trabajo que necesitás"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border rounded-xl p-3 w-full min-h-32"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Zona / barrio"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              className="border rounded-xl p-3"
            />
            <input
              placeholder="Fecha aproximada (opcional)"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="border rounded-xl p-3"
            />
            <input
              placeholder="Presupuesto estimado (opcional)"
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              className="border rounded-xl p-3"
            />
            <input
              required
              placeholder="Tu WhatsApp (ej. 2477123456)"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              className="border rounded-xl p-3"
            />
          </div>

          <label className="flex gap-3 items-start text-sm leading-6">
            <input type="checkbox" required className="mt-1" />
            <span>
              Leí y acepto los{' '}
              <Link href="/terminos" target="_blank" className="underline font-bold">
                Términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link href="/privacidad" target="_blank" className="underline font-bold">
                Política de privacidad
              </Link>
              , y autorizo que mi pedido y mi número de WhatsApp se muestren públicamente en la sección Pedidos
              del sitio, para que profesionales puedan contactarme.
            </span>
          </label>

          <button disabled={enviando} className="btn btn-primary w-full">
            {enviando ? 'Enviando...' : 'Enviar pedido'}
          </button>
        </form>
      </div>
    </main>
  );
}