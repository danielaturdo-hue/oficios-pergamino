import './globals.css';
import {Header} from '@/components/Header';
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
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><Header/>{children}<footer className="border-t border-[#e7e2d8] mt-16 py-10"><div className="container flex flex-col md:flex-row gap-4 justify-between text-sm muted"><div>
<div>© 2026 Oficios Pergamino</div>
<div className="mt-2">
<strong>Daniela Turdó</strong>
<br />
<em>Founder, Applied Business Management</em>
</div>
</div>
<div className="flex gap-5"><a href="/terminos">Términos y condiciones</a><a href="/privacidad">Privacidad</a></div></div></footer></body></html>}
