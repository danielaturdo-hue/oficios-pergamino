import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Analytics } from '@vercel/analytics/next';
import { Poppins, Playfair_Display } from 'next/font/google';
import { MobileBar } from '@/components/MobileBar';

const cuerpo = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });
const titulos = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://oficios-pergamino.vercel.app'),
  title: {
    default: 'Oficios Pergamino | Profesionales y servicios en Pergamino',
    template: '%s | Oficios Pergamino',
  },
  description:
    'Encontrá plomeros, electricistas, pintores, costureras, albañiles, técnicos y otros profesionales de Pergamino. Mirá perfiles y contactalos directo por WhatsApp.',
  keywords: [
    'oficios pergamino',
    'servicios pergamino',
    'plomero pergamino',
    'electricista pergamino',
    'pintor pergamino',
    'costurera pergamino',
    'albañil pergamino',
    'tecnico pergamino',
    'profesionales pergamino',
    'whatsapp',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Oficios Pergamino',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={cuerpo.variable + ' ' + titulos.variable}>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1001572770393484"
     crossOrigin="anonymous"></script>
      <body>
        <Header />
        {children}
        <MobileBar />
        <footer className="border-t border-[#e6d9c3] mt-16 py-10">
          <div className="container flex flex-col md:flex-row gap-6 justify-between text-sm muted">
            <div className="max-w-sm">
              <div className="font-bold text-base">Oficios Pergamino</div>
              <p className="mt-2 leading-6">
                Encontrá profesionales y oficios de la ciudad, de forma simple y segura.
              </p>
              <p className="mt-4">Creado por Daniela Turdó en Pergamino, Argentina</p>
              <p className="mt-1">© 2026 Oficios Pergamino · Versión beta</p>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/empleos">Empleos en Pergamino</a>
              <a href="/pedidos">Pedidos de servicios</a>
              <a href="/terminos">Términos y condiciones</a>
              <a href="/seguridad">Consejos de seguridad</a>
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