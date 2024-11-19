import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['pt-BR', 'en', 'fr', 'es', 'jp'];

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  let locale = 'pt-BR';

  try {
    const cookiesStore = cookies();
    const localeCookie = cookiesStore.get('NEXT_LOCALE');

    if (localeCookie && locales.includes(localeCookie.value)) {
      locale = localeCookie.value;
    }
  } catch {}

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
