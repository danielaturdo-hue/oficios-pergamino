// Avisos de empleo de Pergamino.
// Para agregar uno, copiá un bloque { ... } y completá los datos.
// Importante: poné SOLO el título y el link al aviso ORIGINAL (no copies la descripción).
// Cuando un aviso vence, borralo de esta lista.

export type Empleo = {
  puesto: string;
  empresa: string;
  fuente: string; // Ej: 'LinkedIn', 'Bumeran', 'Randstad', 'Publicado en Oficios Pergamino'
  url: string; // Link directo al aviso original
  fecha?: string; // Ej: '21/10/2026'
};

export const empleos: Empleo[] = [
  // {
  //   puesto: 'Operario/a de depósito',
  //   empresa: 'Randstad',
  //   fuente: 'Randstad',
  //   url: 'https://...',
  //   fecha: '21/10/2026',
  // },
];

export const buscadores = [
  {
    nombre: 'Google Empleos',
    descripcion: 'Junta avisos de varios portales',
    url: 'https://www.google.com/search?q=trabajo+en+pergamino&ibp=htl;jobs',
  },
  {
    nombre: 'LinkedIn',
    descripcion: 'Empleos en Pergamino',
    url: 'https://www.linkedin.com/jobs/search/?location=Pergamino%2C%20Buenos%20Aires%2C%20Argentina',
  },
  {
    nombre: 'Bumeran',
    descripcion: 'Empleos en Pergamino',
    url: 'https://www.bumeran.com.ar/empleos-busqueda-pergamino.html',
  },
  {
    nombre: 'Computrabajo',
    descripcion: 'Empleos en Pergamino',
    url: 'https://ar.computrabajo.com/trabajo-en-buenos-aires-en-pergamino',
  },
];
