import { useLanguage } from '@/hooks/use-language';
import { MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Square2StackIcon, StopIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { useTranslations } from 'use-intl';

type TerminalProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Terminal = ({ children, className, ...rest }: TerminalProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { currentLanguage, onChangeLanguageHandler } = useLanguage();
  const t = useTranslations();

  return (
    <div
      {...rest}
      className={twMerge(
        'flex w-full flex-col rounded-lg bg-zinc-700',
        fullScreen && 'h-full',
        !fullScreen && 'h-full md:h-96 md:max-w-4xl',
        className
      )}
    >
      <div className="flex">
        <div className="flex w-full flex-1 space-x-1 px-4 pt-1.5 text-white">
          <div
            onClick={onChangeLanguageHandler.bind(null, 'pt-BR')}
            className={twJoin(
              'flex items-center space-x-2 rounded-t-lg px-2 py-1.5 md:w-48',
              currentLanguage === 'pt-BR' ? 'bg-black' : 'hover:bg-zinc-800'
            )}
          >
            <div className="relative h-5 w-5">
              <Image src={'/image/flags/BR.svg'} alt="Country flag" fill style={{ objectFit: 'fill' }} priority />
            </div>
            <span className="pointer-events-none hidden text-xs md:block">{t('general.portuguese')}</span>
          </div>
          <div
            onClick={onChangeLanguageHandler.bind(null, 'en')}
            className={twJoin(
              'flex items-center space-x-2 rounded-t-lg px-2 py-1.5 md:w-48',
              currentLanguage === 'en' ? 'bg-black' : 'hover:bg-zinc-800'
            )}
          >
            <div className="relative h-5 w-5">
              <Image src={'/image/flags/US.svg'} alt="Country flag" fill style={{ objectFit: 'fill' }} priority />
            </div>
            <span className="pointer-events-none hidden text-xs md:block">{t('general.english')}</span>
          </div>
        </div>
        <div className="flex h-full items-center text-white">
          <div className="flex h-full w-10 items-center justify-center hover:bg-zinc-500">
            <MinusIcon className="h-5 w-5" />
          </div>
          {!fullScreen && (
            <div className="flex h-full w-10 items-center justify-center hover:bg-zinc-500" onClick={setFullScreen.bind(null, true)}>
              <StopIcon className="h-5 w-5" />
            </div>
          )}
          {fullScreen && (
            <div className="flex h-full w-10 items-center justify-center hover:bg-zinc-500" onClick={setFullScreen.bind(null, false)}>
              <Square2StackIcon className="h-5 w-5" />
            </div>
          )}
          <div className="flex h-full w-10 items-center justify-center rounded-tr-lg hover:bg-red-500">
            <XMarkIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="mx-0.5 mb-0.5 flex flex-1 rounded-b-lg bg-black">{children}</div>
    </div>
  );
};
