'use client';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full w-full">
      <main className="h-full w-full">{children}</main>
    </div>
  );
};
