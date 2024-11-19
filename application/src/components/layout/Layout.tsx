'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import { useTranslations } from 'use-intl';
import { DarkMode } from './DarkMode';
import { Footer } from './Footer';
import { LanguageSelect } from './LanguageSelect';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const t = useTranslations('layout.appbar');
  const path = usePathname();

  return (
    <div>
      <div className="bg-white shadow-sm dark:bg-gray-700">
        <div className="mx-auto flex items-center py-5 text-gray-700 dark:text-white">
          <div className="px-8">
            <DarkMode />
          </div>
          <div className="flex flex-1 justify-center space-x-4 text-lg">
            <Link href={'/projects'} className={twJoin('hover:text-main-500', path.startsWith('/projects') && 'font-bold text-main-500')}>
              {t('projects')}
            </Link>
            <Link href={'/about_me'} className={twJoin('hover:text-main-500', path.startsWith('/about_me') && 'font-bold text-main-500')}>
              {t('about_me')}
            </Link>
          </div>
          <div className="px-8">
            <LanguageSelect />
          </div>
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};
