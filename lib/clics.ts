import { supabaseUrl, supabaseAnonKey } from '@/lib/supabase';

// Registra que alguien tocó "Contactar". No guarda ningún dato de quien lo hizo,
// solo qué perfil y qué categoría. Usa keepalive para que el registro llegue aunque
// el navegador cambie enseguida a WhatsApp, y nunca bloquea el contacto si falla.
export function registrarClic(profesionalId: string | number, categoria: string, origen: 'tarjeta' | 'perfil') {
  try {
    const id = Number(profesionalId);
    if (!Number.isFinite(id)) return;
    fetch(supabaseUrl + '/rest/v1/Clics', {
      method: 'POST',
      keepalive: true,
      headers: {
        apikey: supabaseAnonKey,
        Authorization: 'Bearer ' + supabaseAnonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ profesional_id: id, categoria: categoria || null, origen }),
    }).catch(() => {});
  } catch {
    // el contacto sigue igual
  }
}
