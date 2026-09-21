import { supabase } from '@/lib/supabase';
import { synonyms, categories } from '@/lib/data';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import {SearchBox} from '@/components/SearchBox';

function match(q:string,p:any){if(!q)return true;const s=q.toLowerCase();const words=[p.name,p.trade,p.category,p.description,...p.services,...Object.entries(synonyms).filter(([k,v])=>[k,...v].some(x=>s.includes(x))).map(([k])=>k)].join(' ').toLowerCase();return s.split(/\s+/).every(w=>words.includes(w))||Object.values(synonyms).flat().some(x=>s.includes(x)&&words.includes(x))}
export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string;category?:string}>}){const sp=await searchParams;const q=sp.q||'';
    const { data } = await supabase
.from('Profesionales')
.select('id, created_at, nombre, oficio, telefono, descripcion, localidad, categoria, foto, plan');
const professionalsDb = (data || []).map((p: any) => ({
id: String(p.id),
slug: `profesional-${p.id}`,
name: p.nombre || '',
trade: p.oficio || '',
category: p.categoria || 'General',
zone: p.localidad || '',
description: p.descripcion || '',
years: 0,
home: true,
quotes: true,
rating: 5,
reviews: 0,
jobs: 0,
available: true,
services: [],
hours: '',
whatsapp: p.telefono || '',
badges: [],
photos: [p.foto || '/placeholder-work.svg']
}));
const filtered = professionalsDb.filter(
p => match(q, p) &&
(sp.category ? !p.category.localeCompare(sp.category) : true)
);;return <main className="py-10"><div className="container"><div className="max-w-3xl"><p className="text-sm font-bold text-[#2f6b52]">BUSCAR EN PERGAMINO</p><h1 className="text-4xl font-black mt-2">{q?`Resultados para “${q}”`:'Encontrá un oficio'}</h1><div className="mt-6"><SearchBox initial={q}/></div></div><div className="mt-8 flex gap-2 flex-wrap">{['Todos','A domicilio','Con reseñas','Disponibles'].map(x=><button key={x} className="pill bg-white border border-[#e7e2d8] px-4 py-2 text-sm font-bold">{x}</button>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{filtered.map(p=><ProfessionalCard key={p.id} p={p}/>)}</div>{!filtered.length&&<div className="card p-10 text-center mt-8"><div className="text-5xl">🔎</div><h2 className="text-2xl font-black mt-4">Todavía no encontramos a alguien</h2><p className="muted mt-2">Probá con “plomero”, “arreglar ropa” o “pintar mi casa”.</p></div>}</div></main>}
