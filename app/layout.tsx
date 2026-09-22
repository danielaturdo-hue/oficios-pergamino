import './globals.css';
import { Header } from '@/components/Header';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Oficios Pergamino | Profesionales y servicios en Pergamino',
  description:
    'Encontrá electricistas, plomeros, pintores, gasistas, albañiles y otros profesionales de confianza en Pergamino. Contacto directo por WhatsApp.',
  keywords: [
    'oficios pergamino',
    'servicios pergamino',
    'electricista pergamino',
    'plomero pergamino',
    'gasista pergamino',
    'albañil pergamino',
    'profesionales pergamino',
    'oficios',
    'whatsapp',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <footer className="border-t border-[#e7e2d8] mt-16 py-10">
          <div className="container flex flex-col md:flex-row gap-6 justify-between text-sm muted">
            <div className="max-w-sm">
              <div className="font-bold text-base">Oficios Pergamino</div>
              <p className="mt-2 leading-6">
                Encontrá profesionales y oficios de la ciudad, de forma simple y segura.
              </p>
              <p className="mt-4">Creado por Daniela Turdó en Pergamino, Argentina</p>
              <p className="mt-1">© 2026 Oficios Pergamino · Sitio en etapa de prueba</p>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/terminos">Términos y condiciones</a>
              <a href="/privacidad">Política de privacidad</a>
              <a href="mailto:oficios.pergamino@gmail.com">Contacto</a>
            </div>
          </div>
        </footer>
      <Analytics />
      </body>
    </html>
  );
}