import { setLocale } from '@/actions/set-locale';
import { useRouter } from 'next/navigation';

export const useLanguage = () => {
  const router = useRouter();

  const onChangeLanguageHandler = async (locale: string) => {
    await setLocale(locale);
    router.refresh();
  };

  return {
    onChangeLanguageHandler,
  };
};
