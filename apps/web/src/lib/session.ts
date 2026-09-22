const TOKEN_COOKIE = 'wings_token';

/**
 * Demo-grade session storage: a plain cookie readable by Next.js middleware.
 * Production apps should use an httpOnly cookie set by the server instead.
 */
export function setTokenCookie(token: string) {
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; samesite=lax`;
}

export function getTokenCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${TOKEN_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearTokenCookie() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}
