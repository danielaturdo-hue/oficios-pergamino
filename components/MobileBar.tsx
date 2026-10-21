import Link from 'next/link';
import { Search, Plus } from 'lucide-react';

export function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#e7e2d8] px-4 py-3 flex gap-3">
      <Link href="/buscar" className="btn btn-secondary flex-1 !py-3">
        <Search size={17} /> Buscar
      </Link>
      <Link href="/ofrecer" className="btn btn-yellow flex-1 !py-3">
        <Plus size={17} /> Ofrezco un oficio
      </Link>
    </div>
  );
}
