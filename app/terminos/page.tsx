import Link from 'next/link';

const secciones = [
  {
    titulo: 'Qué es Oficios Pergamino',
    parrafos: [
      'Oficios Pergamino es una plataforma que facilita el contacto entre personas que ofrecen servicios y personas que los buscan. No es empleadora, contratista ni agencia de los profesionales, y no participa en los acuerdos, presupuestos ni pagos que las partes celebren entre sí.',
      'La plataforma se encuentra en etapa de prueba, por lo que puede tener errores, cambios o interrupciones.',
    ],
  },
  {
    titulo: 'Uso de la plataforma',
    parrafos: [
      'La plataforma no garantiza la calidad, disponibilidad, precio ni cumplimiento de un servicio, salvo que expresamente se indique lo contrario. Cada persona decide bajo su propia responsabilidad si contacta o contrata a un profesional.',
      'Se recomienda pedir presupuesto, solicitar referencias y acordar por escrito las condiciones del trabajo antes de contratar.',
    ],
  },
  {
    titulo: 'Quiénes pueden publicar',
    parrafos: [
      'Para publicar un perfil hay que ser mayor de 18 años y brindar información veraz y actualizada. Cada persona debe publicar su propio perfil o contar con la autorización de quien ofrece el servicio.',
    ],
  },
  {
    titulo: 'Habilitaciones y matrículas',
    parrafos: [
      'Quien publica un oficio declara contar con las habilitaciones, matrículas, seguros y permisos que la normativa exija para su actividad (por ejemplo, la matrícula en el caso de gasistas). Oficios Pergamino no verifica esas habilitaciones, salvo que un perfil indique expresamente lo contrario.',
      'Está prohibido presentarse como profesional matriculado o habilitado sin serlo.',
    ],
  },
  {
    titulo: 'Contenido publicado',
    parrafos: [
      'Los usuarios son responsables de la información y las fotos que publican, y deben tener derecho a usarlas. No se permiten imágenes de terceros sin autorización, ni contenido ilegal, engañoso, ofensivo o discriminatorio, ni publicidad ajena a los oficios y servicios.',
      'Al publicar, la persona autoriza a la plataforma a mostrar ese contenido en el sitio mientras el perfil esté activo.',
    ],
  },
  {
    titulo: 'Datos visibles en el perfil',
    parrafos: [
      'Al publicar un perfil, la persona acepta que su nombre, oficio, categoría, zona, descripción, foto y número de WhatsApp sean visibles públicamente, y que otras personas puedan contactarla por ese medio. El email se utiliza para la gestión del perfil y no se muestra en el sitio.',
    ],
  },
  {
    titulo: 'Conductas prohibidas',
    parrafos: [
      'No está permitido suplantar la identidad de otra persona, usar la plataforma para estafas o engaños, enviar mensajes masivos no solicitados a los profesionales, ni extraer datos del sitio de forma automática para otros fines.',
    ],
  },
  {
    titulo: 'Moderación y baja de perfiles',
    parrafos: [
      'La plataforma podrá moderar, ocultar, modificar o eliminar publicaciones y perfiles que incumplan estas reglas o que reciban denuncias fundadas. Quien detecte un perfil que incumple estas reglas puede avisarnos por el medio de contacto indicado al final.',
      'Cualquier profesional puede pedir que su perfil sea modificado o eliminado escribiendo a ese mismo contacto.',
    ],
  },
  {
    titulo: 'Planes y pagos',
    parrafos: [
      'Actualmente publicar un perfil es gratuito. En el futuro podrán ofrecerse planes pagos con beneficios adicionales, como mayor visibilidad. Las condiciones y los precios se informarán con claridad antes de contratar, y no se cobrará nada sin aceptación expresa.',
    ],
  },
  {
    titulo: 'Limitación de responsabilidad',
    parrafos: [
      'Dentro de lo permitido por la ley, Oficios Pergamino no responde por daños derivados de servicios acordados entre usuarios y profesionales, por la información publicada por terceros, ni por errores o interrupciones del sitio. Esto no limita los derechos que la legislación de defensa del consumidor reconozca a las personas usuarias.',
    ],
  },
  {
    titulo: 'Propiedad intelectual',
    parrafos: [
      'El nombre, el diseño y el código de la plataforma pertenecen a sus creadores. Los contenidos publicados por los usuarios siguen siendo de sus autores.',
    ],
  },
  {
    titulo: 'Cambios en estos términos',
    parrafos: [
      'Estos términos pueden actualizarse. La versión vigente es la publicada en esta página, con su fecha de actualización. Continuar usando la plataforma implica aceptar la versión vigente.',
    ],
  },
  {
    titulo: 'Ley aplicable',
    parrafos: [
      'Estos términos se rigen por las leyes de la República Argentina. Ante cualquier controversia, las partes se someten a los tribunales ordinarios competentes, sin perjuicio de los derechos que la ley reconozca a los consumidores.',
    ],
  },
  {
    titulo: 'Contacto',
    parrafos: [
      'Para consultas, reportes o pedidos de baja de perfiles, escribinos a: daniela.turdo@gmail.com',
    ],
  },
];

export default function Terms() {
  return (
    <main className="py-10">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-black">Términos y condiciones</h1>
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
          Para saber cómo se tratan los datos personales, consultá la{' '}
          <Link href="/privacidad" className="underline font-bold">
            Política de Privacidad
          </Link>
          .
        </p>
      </div>
    </main>
  );
}