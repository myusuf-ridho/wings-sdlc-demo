import { redirect } from 'next/navigation';

export default function Home() {
  // Middleware bounces unauthenticated users from /dashboard to /login.
  redirect('/dashboard');
}
