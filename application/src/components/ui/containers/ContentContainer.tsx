import { twMerge } from 'tailwind-merge';

type ContentContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ContentContainer = ({ className, children, ...rest }: ContentContainerProps) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'relative isolate overflow-hidden rounded-2xl bg-white dark:bg-gray-600',
        'px-6 py-24 shadow sm:py-32 lg:overflow-visible lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
};
