import React from 'react';
import { twMerge } from 'tailwind-merge';

export type TextLoadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  loaded?: boolean;
};

export const TextLoading = ({ loaded, children, ...rest }: TextLoadingProps) => {
  if (!loaded) {
    return <div {...rest} className={twMerge('h-2 animate-pulse rounded bg-slate-400', rest.className)}></div>;
  }

  return children;
};
