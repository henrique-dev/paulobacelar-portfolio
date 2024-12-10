import { MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { DocumentDuplicateIcon, MagnifyingGlassIcon, Square2StackIcon, Squares2X2Icon, StopIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type VscodeProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  windowTitle: React.ReactNode;
};

export const Vscode = ({ windowTitle, className, children, ...rest }: VscodeProps) => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div
      {...rest}
      className={twMerge(
        'absolute z-20 flex w-full flex-col rounded-lg bg-zinc-700',
        fullScreen && 'h-full',
        !fullScreen && 'h-full md:h-[600px] md:max-w-4xl',
        className
      )}
    >
      <div className="relative flex min-h-[38px] border-b border-zinc-800">
        <div className="pointer-events-none flex flex-1 items-center justify-center px-4 text-white">{windowTitle}</div>
        <div className="absolute right-0 flex h-full items-center text-white">
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
      <div className="flex w-full bg-zinc-600 text-sm text-white">
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">File</span>
        </div>
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">Edit</span>
        </div>
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">Selection</span>
        </div>
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">View</span>
        </div>
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">Go</span>
        </div>
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">Run</span>
        </div>
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">Terminal</span>
        </div>
        <div className="py-1 pl-2 pr-2 hover:bg-zinc-500">
          <span className="pointer-events-none">Help</span>
        </div>
      </div>
      <div className="flex h-full divide-x divide-zinc-600">
        <div className="h-full space-y-2 bg-zinc-800 p-2">
          <DocumentDuplicateIcon className="h-8 w-8 text-white" />
          <MagnifyingGlassIcon className="h-8 w-8 text-zinc-500 hover:cursor-pointer hover:text-white" />
          <Squares2X2Icon className="h-8 w-8 text-zinc-500 hover:cursor-pointer hover:text-white" />
        </div>
        <div className="h-full space-y-2 bg-zinc-800">
          <div className="mt-2 flex w-48 items-center justify-start space-x-2 bg-zinc-600 px-2 py-1">
            <div className="relative h-3 w-3">
              <Image src={'/image/icons/shell.svg'} alt="Word icon" fill style={{ objectFit: 'fill' }} priority />
            </div>
            <span className="text-sm text-white">portfolio.sh</span>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex bg-zinc-800">
            <div className="flex items-center justify-start space-x-2 bg-zinc-700 px-2 py-1">
              <div className="relative h-3 w-3">
                <Image src={'/image/icons/shell.svg'} alt="Word icon" fill style={{ objectFit: 'fill' }} priority />
              </div>
              <span className="text-white">portfolio.sh</span>
            </div>
          </div>
          <div className="w-full flex-1 bg-zinc-700 p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
