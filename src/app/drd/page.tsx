import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DrdClient from './DrdClient';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('hublang_token')?.value;
  if (!token) redirect('/');

  return <DrdClient />;
}
