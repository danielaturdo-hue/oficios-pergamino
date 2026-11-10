import type { MetadataRoute } from 'next';
import { categories } from '@/lib/data';
import { listarProfesionales } from '@/lib/profesionales';

export const dynamic = 'force-dynamic';

const BASE = 'https://oficios-pergamino.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profesionales = await listarProfesionales();
  const fijas = ['', '/buscar', '/empleos', '/pedidos', '/solicitar', '/ofrecer', '/seguridad'];

  return [
    ...fijas.map((ruta) => ({ url: BASE + ruta })),
    ...categories.map((c) => ({ url: BASE + '/categorias/' + c.slug })),
    ...profesionales.map((p) => ({ url: BASE + '/profesional/' + p.slug })),
  ];
}
