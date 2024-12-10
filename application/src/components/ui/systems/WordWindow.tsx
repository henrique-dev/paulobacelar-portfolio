import { MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Square2StackIcon, StopIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';

type AppbarProps = {
  documentTitle: string;
  children?: React.ReactNode;
};

const Appbar = ({ documentTitle, children }: AppbarProps) => {
  return (
    <div className="flex items-center space-x-2 bg-zinc-400">
      <div className="relative m-2 ml-3 h-10 w-10">
        <Image src={'/image/icons/word.svg'} alt="Word icon" fill style={{ objectFit: 'fill' }} priority />
      </div>
      <div className="relative flex flex-1 flex-col space-y-2 pt-2">
        <div className="pl-2 text-base">{documentTitle}</div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

type AppbarItemProps = {
  options: {
    icon: string;
    name: string;
  }[];
  children?: React.ReactNode;
};

const AppbarItem = ({ options, children }: AppbarItemProps) => {
  return (
    <div className="group relative cursor-pointer px-2 py-1.5 hover:bg-zinc-500 hover:text-white">
      {children}
      <div className="absolute left-0 top-8 hidden w-48 flex-col bg-zinc-300 text-black group-hover:flex">
        {options.map((option) => {
          return (
            <div key={option.name} className="flex h-7 items-center space-x-2 px-2">
              <div className="relative h-4 w-4">
                <Image src={option.icon} alt="Tool icon" fill style={{ objectFit: 'fill' }} priority />
              </div>
              <div>{option.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type WorkspaceProps = {
  children?: React.ReactNode;
};

export const Workspace = ({ children }: WorkspaceProps) => {
  return (
    <div className="flex-1 overflow-auto bg-zinc-200">
      <div className="mx-2 my-1 min-h-48 border border-zinc-400 bg-white md:mx-10 md:my-5">{children}</div>
    </div>
  );
};

type WordWindowProps = {
  children?: React.ReactNode;
  onCloseWindow?: () => void;
};

export const WordWindow = ({ children, onCloseWindow }: WordWindowProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setShowLogo(false);

      clearTimeout(timeoutRef.current);
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [setShowLogo]);

  return (
    <div
      className={twJoin(
        'absolute z-20 flex w-full flex-col rounded-lg bg-zinc-700',
        fullScreen && 'h-full',
        !fullScreen && 'h-full md:h-[600px] md:max-w-4xl'
      )}
    >
      <div className="flex min-h-[38px]">
        <div className="flex w-full flex-1 space-x-1 px-4 pt-1.5 text-white"></div>
        <div className="flex h-full items-center text-white">
          <div className="flex h-full w-10 items-center justify-center hover:bg-zinc-500" onClick={onCloseWindow}>
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
          <div className="flex h-full w-10 items-center justify-center rounded-tr-lg hover:bg-red-500" onClick={onCloseWindow}>
            <XMarkIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
      {showLogo && (
        <>
          <div className="flex flex-1 items-center justify-center bg-blue-500">
            <div className="relative h-16 w-16">
              <Image src={'/image/icons/word.svg'} alt="Word icon" fill style={{ objectFit: 'fill' }} priority />
            </div>
          </div>
        </>
      )}
      {!showLogo && children}
    </div>
  );
};

WordWindow.Appbar = Appbar;
WordWindow.AppbarItem = AppbarItem;
WordWindow.Workspace = Workspace;
