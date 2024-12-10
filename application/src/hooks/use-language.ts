import { getLocale } from '@/actions/get-locale';
import { setLocale } from '@/actions/set-locale';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('pt-BR');
  const router = useRouter();

  const onChangeLanguageHandler = async (locale: string) => {
    await setLocale(locale);
    setCurrentLanguage(locale);
    router.refresh();
  };

  useEffect(() => {
    getLocale().then((locale) => {
      setCurrentLanguage(locale);
    });
  }, [setCurrentLanguage]);

  return {
    currentLanguage,
    onChangeLanguageHandler,
  };
};
