import Link from 'next/link';

const secciones = [
  {
    titulo: 'Quién es responsable de los datos',
    parrafos: [
      'Oficios Pergamino es un proyecto creado por Daniela Turdó, en Pergamino, Argentina. Esta política explica qué datos personales recibe el sitio, para qué se usan y qué derechos tenés sobre ellos.',
    ],
  },
  {
    titulo: 'Qué datos recopilamos',
    parrafos: [
      'Cuando publicás un perfil, te pedimos: nombre, número de WhatsApp, email, categoría y oficio, una descripción de lo que hacés, tu barrio o zona y, si querés, una foto.',
      'Si iniciás sesión en el panel de administración, se usan los datos de acceso necesarios para autenticarte.',
      'Además, el proveedor donde está alojado el sitio puede registrar datos técnicos de las visitas, como la dirección IP y el tipo de navegador, para el funcionamiento y la seguridad del servicio.',
    ],
  },
  {
    titulo: 'Qué datos se muestran públicamente',
    parrafos: [
      'En tu perfil se muestran públicamente tu nombre, oficio, categoría, zona, descripción, foto y número de WhatsApp. Cualquier persona que visite el sitio puede verlos y contactarte por WhatsApp.',
      'Como esa información es pública, puede ser copiada o utilizada por terceros fuera de la plataforma. Publicá solamente un número y una foto que aceptes que sean visibles para cualquier persona.',
      'Tu email no se muestra en el sitio ni puede ser consultado públicamente.',
    ],
  },
  {
    titulo: 'Para qué usamos los datos',
    parrafos: [
      'Usamos los datos para mostrar tu perfil en las búsquedas y categorías, permitir que te contacten, gestionar tu perfil (por ejemplo, modificarlo o darlo de baja), moderar contenido, mantener la seguridad del sitio y, si algún día se ofrecen planes pagos, administrar tu suscripción.',
      'No vendemos tus datos ni los usamos para publicidad de terceros.',
    ],
  },
  {
    titulo: 'Con quién se comparten',
    parrafos: [
      'Para funcionar, el sitio utiliza proveedores de servicios: Supabase (base de datos y almacenamiento de fotos) y Vercel (alojamiento del sitio). Estos proveedores pueden almacenar información en servidores ubicados fuera de Argentina.',
      'Cuando alguien te contacta desde el sitio, la conversación ocurre en WhatsApp y se rige por las políticas de esa aplicación.',
      'Si en el futuro se ofrecen planes pagos, los pagos se procesarán a través de Mercado Pago. Oficios Pergamino no almacena datos de tarjetas.',
      'También podremos compartir datos cuando una autoridad competente lo requiera conforme a la ley.',
    ],
  },
  {
    titulo: 'Cookies',
    parrafos: [
      'El sitio no utiliza cookies publicitarias. Puede usar almacenamiento técnico del navegador, por ejemplo para mantener tu sesión iniciada en el panel de administración.',
    ],
  },
  {
    titulo: 'Cuánto tiempo guardamos los datos',
    parrafos: [
      'Conservamos tus datos mientras tu perfil esté activo. Si pedís la baja, eliminamos tu perfil y tus datos, salvo que debamos conservar alguna información por una obligación legal.',
    ],
  },
  {
    titulo: 'Tus derechos',
    parrafos: [
      'Podés pedir en cualquier momento acceder a tus datos, corregirlos, actualizarlos o eliminarlos, y solicitar la baja de tu perfil. Para hacerlo, escribinos al contacto indicado al final.',
      'La Agencia de Acceso a la Información Pública es el órgano de control de la Ley 25.326 de Protección de Datos Personales de la República Argentina, y atiende las denuncias y reclamos de quienes consideren que sus derechos fueron afectados.',
    ],
  },
  {
    titulo: 'Menores de edad',
    parrafos: [
      'El sitio está dirigido a personas mayores de 18 años. Si detectamos un perfil de una persona menor de edad, lo eliminaremos.',
    ],
  },
  {
    titulo: 'Seguridad',
    parrafos: [
      'Aplicamos medidas razonables para proteger los datos, como restringir el acceso público a los datos que no se muestran en el sitio. Ningún sistema es completamente seguro, por lo que no podemos garantizar una seguridad absoluta.',
    ],
  },
  {
    titulo: 'Cambios en esta política',
    parrafos: [
      'Podemos actualizar esta política. La versión vigente es la publicada en esta página, con su fecha de actualización.',
    ],
  },
  {
    titulo: 'Contacto',
    parrafos: [
      'Para consultas, pedidos de acceso, corrección o baja de datos, escribinos a: daniela.turdo',
    ],
  },
];

export default function Privacy() {
  return (
    <main className="py-10">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-black">Política de privacidad</h1>
        <p className="muted mt-2">
          Última actualización: septiembre de 2026. Oficios Pergamino se encuentra en etapa de prueba.
        </p>

        {secciones.map((s) => (
          <section key={s.titulo} className="mt-9">
            <h2 className="text-2xl font-black">{s.titulo}</h2>
            {s.parrafos.map((t, i) => (
              <p key={i} className="mt-3 leading-7">
                {t}
              </p>
            ))}
          </section>
        ))}

        <p className="mt-9 leading-7">
          Para conocer las reglas de uso del sitio, consultá los{' '}
          <Link href="/terminos" className="underline font-bold">
            Términos y condiciones
          </Link>
          .
        </p>
      </div>
    </main>
  );
}