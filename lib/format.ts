const MINUSCULAS = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e', 'da', 'di']);

export function nombrePropio(texto: string): string {
  const limpio = String(texto || '').trim().replace(/\s+/g, ' ');
  if (!limpio) return '';
  return limpio
    .toLowerCase()
    .split(' ')
    .map((palabra, i) =>
      i > 0 && MINUSCULAS.has(palabra) ? palabra : palabra.charAt(0).toUpperCase() + palabra.slice(1)
    )
    .join(' ');
}

export function primeraMayuscula(texto: string): string {
  const limpio = String(texto || '').trim().replace(/\s+/g, ' ');
  if (!limpio) return '';
  return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

// "Contruccion en gral pintura,cementista t" -> agrega espacio después de comas
export function textoLimpio(texto: string): string {
  return primeraMayuscula(String(texto || '').replace(/,(?=\S)/g, ', '));
}

export function iniciales(nombre: string): string {
  const partes = String(nombre || '').trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return '?';
  const a = partes[0].charAt(0);
  const b = partes.length > 1 ? partes[partes.length - 1].charAt(0) : '';
  return (a + b).toUpperCase();
}

export function tieneFoto(src?: string): boolean {
  return !!src && !src.includes('placeholder-work');
}
