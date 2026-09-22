'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api';
import { clearTokenCookie, getTokenCookie } from '@/lib/session';

/** US-3: clear the session and return to the login page. */
export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getTokenCookie();

    const finish = () => {
      clearTokenCookie();
      router.replace('/login');
    };

    if (token) {
      // Best effort: notify the API, then clear the session regardless.
      logout(token).finally(finish);
    } else {
      finish();
    }
  }, [router]);

  return (
    <main className="center-screen">
      <p className="muted">Signing you out…</p>
    </main>
  );
}
