'use client';

import dynamic from 'next/dynamic';

export const AttachMoneyClientIcon = dynamic(
  () => import('@mui/icons-material/AttachMoney'),
  { ssr: false },
);

export const PeopleClientIcon = dynamic(
  () => import('@mui/icons-material/People'),
  { ssr: false },
);
