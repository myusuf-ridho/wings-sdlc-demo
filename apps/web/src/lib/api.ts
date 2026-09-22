const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: DemoUser;
}

export interface DashboardCard {
  key: string;
  label: string;
  value: number;
  trend: string;
}

export interface DashboardSummary {
  generatedAt: string;
  cards: DashboardCard[];
}

async function parseError(res: Response, fallback: string): Promise<Error> {
  const body = await res.json().catch(() => ({}));
  const message =
    typeof body?.message === 'string'
      ? body.message
      : Array.isArray(body?.message)
        ? body.message.join(', ')
        : fallback;
  return new Error(message);
}

/** US-1: exchange credentials for a JWT at the Wings API. */
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw await parseError(res, 'Login failed');
  }

  return res.json();
}

/** US-3: notify the API of logout (best effort; JWT is stateless). */
export async function logout(token: string): Promise<void> {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => undefined);
}

/** US-2: fetch dashboard metrics with the session token. */
export async function fetchDashboardSummary(
  token: string,
): Promise<DashboardSummary> {
  const res = await fetch(`${API_BASE_URL}/dashboard/summary`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw await parseError(res, 'Failed to load dashboard summary');
  }

  return res.json();
}
