'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/supabase';
export default function Offer() { 
    const [done, setDone] = useState(false); 
    
const [nombre, setNombre] = useState('');
const [telefono, setTelefono] = useState('');
const [oficio, setOficio] = useState('');
const [descripcion, setDescripcion] = useState('');
const [localidad, setLocalidad] = useState('');
    const router = useRouter();
    if (done) return <main className="py-16">
        <div className="container max-w-xl"><div className="card p-10 text-center"><div className="text-6xl">🎉</div><h1 className="text-3xl font-black mt-4">¡Tu oficio quedó listo!</h1><p className="muted mt-2">En producción este paso creará el perfil en la base de datos y pasará por moderación.</p><button onClick={() => router.push('/buscar')} 
    className="btn btn-primary mt-6">Ver profesionales</button></div></div></main>;
    
    return <main className="py-10"><div className="container max-w-3xl"><p className="text-sm font-bold text-[#2f6b52]">PUBLICAR MI OFICIO</p><h1 className="text-4xl font-black mt-2">Contanos qué hacés</h1><p className="muted mt-2">
        Completá lo esencial. Después podrás ampliar tu perfil.
        </p>
        
        <form 
          onSubmit={async e => {
e.preventDefault();

const { error } = await supabase
.from('Profesionales')
.insert([
{
nombre,
apellido: '',
oficio: oficio,
telefono: telefono,
email: '',
descripcion: descripcion,
localidad: localidad,
verificado: false,
plan: 'gratis'
}
]);

if (error) {
alert(error.message);
return;
}

setDone(true);
}} 

        className="card p-6 md:p-8 mt-7 space-y-7">
            
            <fieldset>
                
                <legend className="font-black text-xl">
                    Datos personales
                    </legend>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        
                        <input 
                        required 
                        placeholder="Nombre" 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        className="border rounded-xl p-3"
                         />
                         <input
                          required
                           placeholder="WhatsApp (ej. 549...)"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                            className="border rounded-xl p-3"
                             />
                             </div>
                             
                             </fieldset>
                             
                             <fieldset>
                                <legend className="font-black text-xl"
                                >Mi oficio
                                </legend>
                                <div className="grid md:grid-cols-2 gap-4 mt-4"><select required className="border rounded-xl p-3"><option value="">Categoría</option>{categories.map(c => <option key={c.name}>{c.name}</option>)}</select><input required placeholder="Oficio principal" 
                                value={oficio}
                                onChange={e => setOficio(e.target.value)}
                                className="border rounded-xl p-3" /></div><input placeholder="Servicios específicos: ej. cierres, dobladillos…" className="border rounded-xl p-3 w-full mt-4" /><textarea required placeholder="Contá brevemente qué hacés" 
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)}
                                className="border rounded-xl p-3 w-full mt-4 min-h-28" /></fieldset><fieldset><legend className="font-black text-xl">Zona y trabajo</legend><div className="grid md:grid-cols-2 gap-4 mt-4"><input required placeholder="Barrio / zona" 
                                value={localidad}
                                onChange={e => setLocalidad(e.target.value)}
                                className="border rounded-xl p-3" /><input type="number" min="0" placeholder="Años de experiencia" className="border rounded-xl p-3" /></div><label className="flex gap-2 mt-4"><input type="checkbox" /> Trabajo a domicilio</label><label className="flex gap-2 mt-2"><input type="checkbox" /> Hago presupuestos</label></fieldset><fieldset><legend className="font-black text-xl">Portfolio</legend><input type="file" accept="image/*" multiple className="border rounded-xl p-3 w-full mt-4" /><p className="text-xs muted mt-2">Hasta 8 fotos. En producción se guardarán en Storage.</p></fieldset><button className="btn btn-primary w-full">Publicar mi oficio</button></form></div></main> }
