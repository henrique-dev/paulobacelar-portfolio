import { getLocale } from '@/actions/get-locale';
import { setLocale } from '@/actions/set-locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SelectInput } from '../ui/forms';

const languageOptions = [
  { id: 'pt-BR', description: 'PT', name: 'BR' },
  { id: 'en', description: 'EN', name: 'US' },
];

type LanguageSelectProps = {};

export const LanguageSelect = ({}: LanguageSelectProps) => {
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

  return (
    <div>
      <div className="relative">
        <SelectInput
          loaded
          notFoundMessage=""
          options={languageOptions}
          value={currentLanguage}
          onChange={onChangeLanguageHandler}
          renderButton={(option) => {
            return (
              <div className="flex items-center space-x-2">
                <div className="relative h-5 w-5">
                  <Image src={`/image/flags/${option.name}.svg`} alt="Country flag" fill style={{ objectFit: 'fill' }} priority />
                </div>
                <span>{option.description}</span>
              </div>
            );
          }}
          renderItem={(option) => {
            return (
              <div className="flex items-center space-x-2">
                <div className="relative h-5 w-5">
                  <Image src={`/image/flags/${option.name}.svg`} alt="Country flag" fill style={{ objectFit: 'fill' }} priority />
                </div>
                <span>{option.description}</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
