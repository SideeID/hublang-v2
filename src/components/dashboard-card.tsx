import Link from 'next/link';
import type { ReactNode } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type CardItem = {
  key: string;
  title: string;
  href?: string;
  desc: string;
  status: 'available' | 'coming-soon' | 'maintenance';
  icon: ReactNode;
};

interface DashboardCardProps {
  card: CardItem;
}

export function DashboardCard({ card }: DashboardCardProps) {
  const getStatusConfig = (status: CardItem['status']) => {
    switch (status) {
      case 'available':
        return {
          badge: 'Tersedia',
          badgeClass: 'bg-green-100 text-green-800 border-green-200',
          cardClass: 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
          iconBg: 'bg-green-100',
        };
      case 'coming-soon':
        return {
          badge: 'Segera Hadir',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
          cardClass: 'opacity-75',
          iconBg: 'bg-amber-100',
        };
      case 'maintenance':
        return {
          badge: 'Maintenance',
          badgeClass: 'bg-red-100 text-red-800 border-red-200',
          cardClass: 'opacity-75',
          iconBg: 'bg-red-100',
        };
    }
  };

  const config = getStatusConfig(card.status);

  const CardContent = () => (
    <div
      className={`
      bg-white rounded-xl p-6 border border-slate-200 shadow-sm 
      transition-all duration-300 ease-out h-full
      ${config.cardClass}
    `}
    >
      <div className='flex items-start justify-between mb-4'>
        <div
          className={`w-12 h-12 ${config.iconBg} rounded-lg flex items-center justify-center`}
        >
          <span className='text-xl flex items-center justify-center'>
            {card.icon}
          </span>
        </div>

        <span
          className={`
          px-2 py-1 text-xs font-medium rounded-full border
          ${config.badgeClass}
        `}
        >
          {config.badge}
        </span>
      </div>

      <h3 className='text-lg font-semibold text-slate-900 mb-2'>
        {card.title}
      </h3>

      <p className='text-slate-600 text-sm leading-relaxed'>{card.desc}</p>

      {card.status === 'available' && (
        <div className='mt-4 pt-4 border-t border-slate-100'>
          <div className='flex items-center text-blue-600 text-sm font-medium'>
            Buka Modul
            <ChevronRightIcon className='w-4 h-4 ml-1 transition-transform group-hover:translate-x-1' />
          </div>
        </div>
      )}
    </div>
  );

  if (card.href && card.status === 'available') {
    return (
      <Link href={card.href} className='block group'>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
