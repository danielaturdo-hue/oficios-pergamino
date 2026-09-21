'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export default function Offer() {
  const [done, setDone] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState('');
  const [oficio, setOficio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [localidad, setLocalidad] = useState('');
  const router = useRouter();

  if (done) {
    return (
      <main className="py-16">
        <div className="container max-w-xl">
          <div className="card p-10 text-center">
            <div className="text-6xl">🎉</div>
            <h1 className="text-3xl font-black mt-4">¡Tu oficio quedó publicado!</h1>
            <p className="muted mt-2">Ya podés aparecer en las búsquedas de Oficios Pergamino.</p>
            <button onClick={() => router.push('/buscar')} className="btn btn-primary mt-6">
              Ver profesionales
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="container max-w-3xl">
        <p className="text-sm font-bold text-[#2f6b52]">PUBLICAR MI OFICIO</p>
        <h1 className="text-4xl font-black mt-2">Contanos qué hacés</h1>
        <p className="muted mt-2">Completá lo esencial. Después podrás ampliar tu perfil.</p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const { error } = await supabase.from('Profesionales').insert([
              {
                nombre: nombre,
                apellido: '',
                oficio: oficio,
                telefono: telefono,
                email: email,
                descripcion: descripcion,
                localidad: localidad,
                categoria: categoria,
                verificado: false,
                plan: 'gratis',
              },
            ]);

            if (error) {
              alert(error.message);
              return;
            }

            setDone(true);
          }}
          className="card p-6 md:p-8 mt-7 space-y-7"
        >
          <fieldset>
            <legend className="font-black text-xl">Datos personales</legend>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <input
                required
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border rounded-xl p-3"
              />
              <input
                required
                placeholder="WhatsApp (ej. 2477123456)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border rounded-xl p-3"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-xl p-3"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-black text-xl">Mi oficio</legend>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <select
                required
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="border rounded-xl p-3"
              >
                <option value="">Categoría</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                required
                placeholder="Oficio principal"
                value={oficio}
                onChange={(e) => setOficio(e.target.value)}
                className="border rounded-xl p-3"
              />
            </div>
            <textarea
              required
              placeholder="Contá brevemente qué hacés"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border rounded-xl p-3 w-full mt-4 min-h-28"
            />
          </fieldset>

          <fieldset>
            <legend className="font-black text-xl">Zona</legend>
            <div className="mt-4">
              <input
                required
                placeholder="Barrio / zona"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                className="border rounded-xl p-3 w-full"
              />
            </div>
          </fieldset>

          <button className="btn btn-primary w-full">Publicar mi oficio</button>
        </form>
      </div>
    </main>
  );
}