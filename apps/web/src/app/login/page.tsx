'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';
import { setTokenCookie } from '@/lib/session';

/**
 * US-1: Login. Placeholder layout — will be replaced 1:1 from Figma
 * during the dry run (see docs/design.md).
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@wings.io');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { accessToken } = await login(email, password);
      setTokenCookie(accessToken);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="center-screen">
      <section className="card login-card" aria-labelledby="login-title">
        <div className="brand">
          <span className="brand-mark">W</span>
          <span className="brand-name">Wings</span>
        </div>
        <h1 id="login-title" className="page-title">
          Sign in
        </h1>
        <p className="muted">Access the Wings dashboard platform.</p>

        <form onSubmit={onSubmit} className="form">
          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Demo123!"
              required
            />
          </label>

          {error ? (
            <p role="alert" className="error">
              {error}
            </p>
          ) : null}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="muted small">
          Demo credentials: admin@wings.io / Demo123!
        </p>
      </section>
    </main>
  );
}
