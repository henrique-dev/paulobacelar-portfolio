'use server';

import { cookies } from 'next/headers';

export const getLocale = async () => {
  const cookiesStore = cookies();

  const locale = cookiesStore.get('NEXT_LOCALE');

  return locale?.value ?? 'pt-BR';
};
