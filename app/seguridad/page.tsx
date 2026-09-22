import { ShieldAlert, Phone, FileText, Users, Flag } from 'lucide-react';

const consejos = [
  {
    icon: FileText,
    titulo: 'Confirmá los datos antes de contratar',
    texto:
      'Oficios Pergamino no verifica identidades ni matrículas. Pedile a la persona su nombre completo, y si el oficio requiere matrícula (gas, electricidad), pedí verla.',
  },
  {
    icon: Users,
    titulo: 'Pedí referencias',
    texto: 'Preguntá si tiene trabajos anteriores para mostrar, o referencias de otros clientes.',
  },
  {
    icon: ShieldAlert,
    titulo: 'No adelantes dinero',
    texto:
      'Desconfiá de quien pida un pago total o una seña grande antes de empezar el trabajo, sobre todo si recién se conocieron.',
  },
  {
    icon: Phone,
    titulo: 'Avisale a alguien de confianza',
    texto:
      'Si vas a recibir a una persona en tu casa, o vas a ir a un domicilio que no conocés, contale a un familiar o amigo cuándo y dónde.',
  },
  {
    icon: Flag,
    titulo: 'Reportá lo que te resulte sospechoso',
    texto:
      'Si un perfil te parece falso, si te piden datos personales de más, o si algo no se siente bien, usá el botón "Reportar perfil" o escribinos.',
  },
];

export default function Seguridad() {
  return (
    <main className="py-10">
      <div className="container max-w-3xl">
        <p className="text-sm font-bold text-[#2f6b52]">TU SEGURIDAD PRIMERO</p>
        <h1 className="text-4xl font-black mt-2">Consejos antes de contratar o trabajar</h1>
        <p className="muted mt-3 leading-7">
          Oficios Pergamino conecta personas, pero no participa en los acuerdos entre ellas ni verifica
          identidades. Estos consejos te ayudan a cuidarte, sea que busques un servicio o que lo ofrezcas.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {consejos.map((c) => (
            <div key={c.titulo} className="card p-6">
              <c.icon className="text-[#2f6b52]" size={26} />
              <h2 className="font-black text-lg mt-3">{c.titulo}</h2>
              <p className="text-sm muted mt-2 leading-6">{c.texto}</p>
            </div>
          ))}
        </div>

        <div className="card p-6 mt-8 bg-[#e8f2eb]">
          <p className="font-black">¿Necesitás reportar algo?</p>
          <p className="text-sm mt-2">
            Escribinos a{' '}
            <a href="mailto:oficios.pergamino@gmail.com" className="underline font-bold">
              oficios.pergamino@gmail.com
            </a>{' '}
            contándonos qué pasó y, si podés, el nombre del perfil involucrado.
          </p>
        </div>
      </div>
    </main>
  );
}