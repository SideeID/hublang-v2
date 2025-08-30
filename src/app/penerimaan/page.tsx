import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Dashboard from '@/components/dashboard/Dashboard';

export default async function PenerimaanPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('hublang_token')?.value;
  if (!token) redirect('/');

  return <Dashboard />;
}
