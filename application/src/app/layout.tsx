import { Layout } from '@/components/layout';
import ThemeProvider from '@/providers/ThemeProvider';
import '@/styles/application.scss';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTimeZone } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import { CustomDocument } from './CustomDocument';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Paulo Bacelar portfolio',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  const timezone = await getTimeZone();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <ThemeProvider>
      <CustomDocument locale={locale}>
        <body className={twJoin(inter.className, 'h-full bg-gray-50 dark:bg-gray-950')}>
          <NextIntlClientProvider timeZone={timezone} locale={locale} messages={messages}>
            <Layout>{children}</Layout>
          </NextIntlClientProvider>
        </body>
      </CustomDocument>
    </ThemeProvider>
  );
};

export default RootLayout;
