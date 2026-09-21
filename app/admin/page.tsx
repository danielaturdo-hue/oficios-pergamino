'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { requests, categories } from '@/lib/data';
export default function Admin() {
const router = useRouter();
const [totalProfesionales, setTotalProfesionales] = useState(0);
useEffect(() => {
async function checkUser() {
const {
data: { session },
} = await supabase.auth.getSession();
if (!session) {
router.push('/login');
return;
}
const result = await supabase
.from('Profesionales')
.select('*');
setTotalProfesionales(result.data?.length || 0);
}
checkUser();
}, [router]);
return (
<main className="py-10">
<div className="container">
<h1>Panel de administración</h1>
<p>Profesionales en Supabase: {totalProfesionales}</p>
<p>Solicitudes: {requests.length}</p>
<p>Categorías: {categories.length}</p>
</div>
</main>
);
}