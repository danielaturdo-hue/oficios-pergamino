'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/supabase';

async function reducirFoto(archivo: File): Promise<Blob> {
  const bitmap = await createImageBitmap(archivo);
  const max = 800;
  const escala = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo procesar la foto');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('No se pudo procesar la foto'))),
      'image/jpeg',
      0.85
    );
  });
}

const OFICIOS_GENERICOS = ['varios', 'varios oficios', 'todo', 'todo tipo de trabajos', 'otros', 'otro'];

export default function Offer() {
  const [done, setDone] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState('');
  const [oficio, setOficio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [vista, setVista] = useState('');
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

            const oficioLimpio = oficio.trim();
            if (OFICIOS_GENERICOS.includes(oficioLimpio.toLowerCase())) {
              alert(
                'Escribí tu oficio principal (por ejemplo: Plomero). Los demás trabajos que hacés, contalos en la descripción.'
              );
              return;
            }

            setEnviando(true);

            let fotoUrl = '';
            if (foto) {
              try {
                const reducida = await reducirFoto(foto);
                const nombreArchivo = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
                const { error: errorFoto } = await supabase.storage
                  .from('fotos')
                  .upload(nombreArchivo, reducida, { contentType: 'image/jpeg' });
                if (errorFoto) {
                  alert('No se pudo subir la foto: ' + errorFoto.message);
                  setEnviando(false);
                  return;
                }
                fotoUrl = supabase.storage.from('fotos').getPublicUrl(nombreArchivo).data.publicUrl;
              } catch (err) {
                alert('No se pudo procesar la foto. Probá con otra imagen (JPG o PNG).');
                setEnviando(false);
                return;
              }
            }

            const { error } = await supabase.from('Profesionales').insert([
              {
                nombre: nombre,
                apellido: '',
                oficio: oficioLimpio,
                telefono: telefono,
                email: email,
                descripcion: descripcion,
                localidad: localidad,
                categoria: categoria,
                foto: fotoUrl,
                verificado: false,
                plan: 'gratis',
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
                maxLength={40}
                placeholder="Tu oficio principal (ej. Plomero, Costurera)"
                value={oficio}
                onChange={(e) => setOficio(e.target.value)}
                className="border rounded-xl p-3"
              />
            </div>
            <p className="text-xs muted mt-2">
              Escribí un solo oficio principal. Los demás trabajos que hacés, contalos en la descripción.
            </p>
            <textarea
              required
              placeholder="Contá qué trabajos hacés, tu experiencia y en qué zonas trabajás"
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

          <fieldset>
            <legend className="font-black text-xl">Foto de perfil (obligatoria)</legend>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => {
                const archivo = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                setFoto(archivo);
                setVista(archivo ? URL.createObjectURL(archivo) : '');
              }}
              className="border rounded-xl p-3 w-full mt-4"
            />
            <p className="text-xs muted mt-2">La foto se mostrará públicamente en tu perfil.</p>
            {vista ? (
              <img src={vista} alt="" className="w-24 h-24 rounded-2xl object-cover mt-3" />
            ) : null}
          </fieldset>

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
              , y acepto que mi nombre, oficio, zona, foto y WhatsApp se muestren públicamente.
            </span>
          </label>

          <button disabled={enviando} className="btn btn-primary w-full">
            {enviando ? 'Publicando...' : 'Publicar mi oficio'}
          </button>
        </form>
      </div>
    </main>
  );
}