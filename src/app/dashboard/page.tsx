import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardCard } from '@/components/dashboard-card';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  AttachMoneyClientIcon,
  PeopleClientIcon,
} from '@/components/client-icons';

type CardItem = {
  key: string;
  title: string;
  href?: string;
  desc: string;
  status: 'available' | 'coming-soon' | 'maintenance';
  icon: ReactNode;
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('hublang_token')?.value;
  if (!token) redirect('/');

  const cards: CardItem[] = [
    {
      key: 'keuangan',
      title: 'Keuangan',
      href: undefined,
      desc: 'Kelola keuangan dan laporan bisnis Anda dengan mudah',
      status: 'coming-soon',
      icon: <AttachMoneyClientIcon className='w-5 h-5 text-slate-700' />,
    },
    {
      key: 'hub-pelanggan',
      title: 'Hubungan Pelanggan',
      href: '/penerimaan',
      desc: 'Kelola interaksi dan layanan pelanggan secara efisien',
      status: 'available',
      icon: <PeopleClientIcon className='w-5 h-5 text-slate-700' />,
    },
  ];

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <DashboardHeader />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8'>
          {cards.map((card) => (
            <DashboardCard key={card.key} card={card} />
          ))}
        </div>
      </div>
    </main>
  );
}
