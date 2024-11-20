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
      <div className="sticky top-0 z-50 shadow-sm">
        <div className="absolute top-0 z-0 h-full w-full bg-white opacity-90 dark:bg-gray-700"></div>
        <div className="mx-auto flex flex-col items-center gap-y-5 py-5 text-gray-700 sm:flex-row dark:text-white">
          <div className="w-full sm:absolute">
            <div className="flex w-full items-center justify-center">
              <div className="z-10 px-8">
                <DarkMode />
              </div>
              <div className="flex-1"></div>
              <div className="w-min px-8">
                <LanguageSelect />
              </div>
            </div>
          </div>
          <div className="z-20 mx-auto justify-center space-x-4 text-lg">
            <Link
              href={'/projects'}
              className={twJoin(
                'hover:text-main-500 dark:hover:text-main-400',
                path.startsWith('/projects') && 'font-bold text-main-500 dark:text-main-400'
              )}
            >
              {t('projects')}
            </Link>
            <Link
              href={'/about_me'}
              className={twJoin(
                'hover:text-main-500 dark:hover:text-main-400',
                path.startsWith('/about_me') && 'font-bold text-main-500 dark:text-main-400'
              )}
            >
              {t('about_me')}
            </Link>
          </div>
        </div>
      </div>
      <main className="space-y-4 px-8 py-4 md:container md:mx-auto">
        {children}
        <Footer />
      </main>
    </div>
  );
};
