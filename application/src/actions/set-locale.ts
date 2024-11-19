'use server';

import { cookies } from 'next/headers';

export const setLocale = async (locale: string) => {
  const cookiesStore = cookies();

  cookiesStore.set('NEXT_LOCALE', locale);

  return locale;
};
