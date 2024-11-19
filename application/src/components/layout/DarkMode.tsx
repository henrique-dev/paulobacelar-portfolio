import { ThemeContext } from '@/providers/ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';

export const DarkMode = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <button onClick={themeContext.toggleMode} className="-m-1.5 p-1.5">
      {themeContext.mode == 'dark' ? (
        <SunIcon className="h-6 w-6 text-white" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
      )}
    </button>
  );
};
