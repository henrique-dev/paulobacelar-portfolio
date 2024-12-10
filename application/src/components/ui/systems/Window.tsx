import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Square2StackIcon, StopIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

const ExplorerBar = () => {
  return (
    <div className="flex bg-zinc-600 px-4 py-2">
      <ArrowLeftIcon className="h-5 w-10 text-zinc-500" />
      <ArrowRightIcon className="h-5 w-10 text-zinc-500" />
    </div>
  );
};

const Content = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex w-full flex-1 divide-x divide-zinc-700 rounded-b-lg bg-zinc-800">{children}</div>;
};

const ContentSidebar = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex w-auto flex-col py-4 text-sm text-white sm:w-48">{children}</div>;
};

type ContentSidebarItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  icon: string;
};

const ContentSidebarItem = ({ icon, children, ...rest }: ContentSidebarItemProps) => {
  return (
    <div {...rest} className={twMerge('flex h-10 items-center space-x-2 px-4 hover:cursor-pointer hover:bg-zinc-500', rest.className)}>
      <div className="relative h-4 w-4">
        <Image src={icon} alt="Ruby icon" fill style={{ objectFit: 'fill' }} priority />
      </div>
      <div>{children}</div>
    </div>
  );
};

type ContentSidebarItemWithoutIconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  active?: boolean;
};

const ContentSidebarItemWithoutIcon = ({ active, children, ...rest }: ContentSidebarItemWithoutIconProps) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'flex h-10 items-center space-x-2 px-4 hover:cursor-pointer hover:bg-zinc-500',
        rest.className,
        active && 'bg-zinc-700'
      )}
    >
      {children}
    </div>
  );
};

type WindowProps = {
  windowTitle?: string;
  children: (fullscreen: boolean) => React.ReactNode;
  onCloseWindow?: () => void;
};

export const Window = ({ windowTitle, children, onCloseWindow }: WindowProps) => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div
      className={twJoin(
        'absolute z-20 flex w-full flex-col rounded-lg bg-zinc-700',
        fullScreen && 'h-full',
        !fullScreen && 'h-full overflow-hidden md:h-[600px] md:max-h-[600px] md:max-w-4xl'
      )}
    >
      <div className="flex min-h-[38px]">
        <div className="pointer-events-none flex flex-1 items-center px-4 text-white">{windowTitle}</div>
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
      {children(fullScreen)}
    </div>
  );
};

Window.ExplorerBar = ExplorerBar;
Window.Content = Content;
Window.ContentSidebar = ContentSidebar;
Window.ContentSidebarItem = ContentSidebarItem;
Window.ContentSidebarItemWithoutIcon = ContentSidebarItemWithoutIcon;
