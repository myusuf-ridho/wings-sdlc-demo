'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSummary, fetchDashboardSummary } from '@/lib/api';
import { getTokenCookie } from '@/lib/session';

/**
 * US-2: Dashboard. Placeholder layout — will be replaced 1:1 from Figma
 * during the dry run (see docs/design.md).
 */
export default function DashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getTokenCookie();
    if (!token) {
      router.replace('/login');
      return;
    }

    fetchDashboardSummary(token)
      .then(setSummary)
      .catch(() =>
        setError('Could not load dashboard data. Your session may have expired.'),
      );
  }, [router]);

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">W</span>
          <span className="brand-name">Wings</span>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => router.push('/logout')}
        >
          Log out
        </button>
      </header>

      <section className="content">
        <h1 className="page-title">Dashboard</h1>
        <p className="muted">
          Key metrics at a glance{summary ? '' : ' — loading…'}
        </p>

        {error ? (
          <div className="card">
            <p role="alert" className="error">
              {error}
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => router.push('/logout')}
            >
              Back to login
            </button>
          </div>
        ) : null}

        <div className="cards-grid">
          {(summary?.cards ?? []).map((card) => (
            <article key={card.key} className="card stat-card">
              <p className="muted small">{card.label}</p>
              <p className="stat-value">{card.value.toLocaleString()}</p>
              <p className="muted small">{card.trend}</p>
            </article>
          ))}
        </div>

        {summary ? (
          <p className="muted small">
            Served by the Wings API · generated at{' '}
            {new Date(summary.generatedAt).toLocaleString()}
          </p>
        ) : null}
      </section>
    </main>
  );
}
