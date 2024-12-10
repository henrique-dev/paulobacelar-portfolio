'use client';

import { Footer } from '@/components/layout/Footer';
import { AboutMe } from './AboutMe';
import { MainTerminal } from './MainTerminal';
import { ProjectsWindow } from './ProjectsWindow';
import { ProjectWindow } from './ProjectWindow';
import { TerminalProvider } from './TerminalProvider';

export const MainPage = () => {
  return (
    <TerminalProvider>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <MainTerminal />
        <ProjectsWindow />
        <ProjectWindow />
        <AboutMe />
        <Footer />
      </div>
    </TerminalProvider>
  );
};
