import { supabase } from '@/lib/supabase';
import type { Professional } from '@/lib/data';
import { nombrePropio, normalizar } from '@/lib/format';

// Columnas que siempre existieron en la tabla Profesionales.
const BASE = 'id, created_at, nombre, oficio, telefono, descripcion, localidad, categoria, foto, plan';
// Columnas que agrega la migración 002_mejoras.sql.
const NUEVAS = BASE + ', anios_experiencia, fotos_trabajos';

type Resultado = { data: any; error: unknown };

// Si la migración 002 todavía no se ejecutó en Supabase, la consulta nueva falla
// y se usa la anterior. Así el sitio no se rompe si se publica el código antes.
async function conFallback(nueva: () => PromiseLike<Resultado>, vieja: () => PromiseLike<Resultado>) {
  const r = await nueva();
  if (!r.error) return r.data;
  const v = await vieja();
  return v.data;
}

export function aProfesional(p: any, categoriaPorDefecto = 'General'): Professional {
  const fotosTrabajos: string[] = Array.isArray(p.fotos_trabajos) ? p.fotos_trabajos.filter(Boolean) : [];
  return {
    id: String(p.id),
    slug: 'profesional-' + p.id,
    name: p.nombre || '',
    trade: p.oficio || '',
    category: p.categoria || categoriaPorDefecto,
    zone: p.localidad || '',
    description: p.descripcion || '',
    years: Number(p.anios_experiencia) || 0,
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
    photos: [p.foto || '/placeholder-work.svg'],
    workPhotos: fotosTrabajos,
  };
}

export async function listarProfesionales(opts: { categoria?: string; limite?: number } = {}): Promise<Professional[]> {
  const armar = (columnas: string, soloAprobados: boolean) => {
    let q: any = supabase.from('Profesionales').select(columnas);
    if (soloAprobados) q = q.eq('aprobado', true);
    if (opts.categoria) q = q.eq('categoria', opts.categoria);
    q = q.order('created_at', { ascending: false });
    if (opts.limite) q = q.limit(opts.limite);
    return q;
  };
  const data = await conFallback(() => armar(NUEVAS, true), () => armar(BASE, false));
  return ((data as any[]) || []).map((p) => aProfesional(p, opts.categoria));
}

// Devuelve la fila tal como está en la base, o null si no existe o todavía no fue aprobada.
export async function obtenerProfesional(id: string): Promise<any | null> {
  const armar = (columnas: string, soloAprobados: boolean) => {
    let q: any = supabase.from('Profesionales').select(columnas).eq('id', id);
    if (soloAprobados) q = q.eq('aprobado', true);
    return q.maybeSingle();
  };
  return conFallback(() => armar(NUEVAS, true), () => armar(BASE, false));
}

export async function contarProfesionales(): Promise<number> {
  const armar = (soloAprobados: boolean) => {
    let q: any = supabase.from('Profesionales').select('id', { count: 'exact', head: true });
    if (soloAprobados) q = q.eq('aprobado', true);
    return q;
  };
  const nueva = await armar(true);
  if (!nueva.error) return nueva.count ?? 0;
  const vieja = await armar(false);
  return vieja.count ?? 0;
}

export type Zona = { clave: string; nombre: string; cantidad: number };

export function claveZona(zona: string): string {
  return normalizar(zona);
}

// Arma la lista de zonas a partir de los perfiles que se están mostrando.
export function zonasDe(profesionales: Professional[]): Zona[] {
  const mapa = new Map<string, Zona>();
  for (const p of profesionales) {
    const clave = claveZona(p.zone);
    if (!clave) continue;
    const actual = mapa.get(clave);
    if (actual) actual.cantidad += 1;
    else mapa.set(clave, { clave, nombre: nombrePropio(p.zone), cantidad: 1 });
  }
  return Array.from(mapa.values()).sort((a, b) => b.cantidad - a.cantidad || a.nombre.localeCompare(b.nombre));
}

// Zonas ya usadas por otros profesionales, para sugerirlas en el formulario.
export async function zonasSugeridas(): Promise<string[]> {
  const nueva: any = await supabase.from('Profesionales').select('localidad').eq('aprobado', true);
  const data: any[] = nueva.error ? (await supabase.from('Profesionales').select('localidad')).data || [] : nueva.data || [];
  const vistas = new Map<string, string>();
  for (const fila of data) {
    const clave = claveZona(fila.localidad);
    if (clave && !vistas.has(clave)) vistas.set(clave, nombrePropio(fila.localidad));
  }
  return Array.from(vistas.values()).sort((a, b) => a.localeCompare(b));
}
