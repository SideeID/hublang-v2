import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('hublang_token')?.value;
  if (!token) redirect('/');

  const Client = (await import('./Client')).default;
  return <Client />;
}
