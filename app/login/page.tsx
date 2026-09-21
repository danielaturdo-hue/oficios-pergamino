'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage('Inicio de sesión correcto ✅');
  router.push('/admin');
  }

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage('Revisá tu email para confirmar la cuenta 📧');
  }

  return (
    <main className="py-16">
      <div className="container max-w-md">
        <div className="card p-7">
          <h1 className="text-3xl font-black">Ingresar</h1>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-xl p-3 w-full"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-xl p-3 w-full"
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Ingresar
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="btn btn-secondary w-full"
            >
              Crear cuenta
            </button>
          </form>

          {message && (
            <p className="mt-4 text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}