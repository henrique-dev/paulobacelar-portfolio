'use client';

import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import Error from './error';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Our financial Login',
  description: 'Our financial Login',
};

const GlobalError = () => {
  return (
    <html className="h-full">
      <body className={twJoin(inter.className, 'h-full bg-slate-800')}>
        <Error />
      </body>
    </html>
  );
};

export default GlobalError;
