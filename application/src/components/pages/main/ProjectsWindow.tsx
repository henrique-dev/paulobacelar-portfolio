import { Window } from '@/components/ui/systems';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useContext } from 'react';
import { TerminalContext } from './TerminalProvider';

const projects = [
  {
    title: 'projects.our_financial.title',
    description: 'projects.our_financial.description',
    code: 'our_financial',
    date: '2024-11-19',
    tags: ['Next.js', 'Ruby on Rails', 'PostgreSQL'],
    image: '/image/financial-app.png',
  },
];

export const ProjectsWindow = () => {
  const { showProjects, backToTerminal, setProjectToShow } = useContext(TerminalContext);
  const t = useTranslations();

  if (!showProjects) return undefined;

  return (
    <Window onCloseWindow={backToTerminal} windowTitle={t('pages.main.projects_window.title')}>
      {() => (
        <>
          <Window.ExplorerBar />
          <Window.Content>
            <Window.ContentSidebar>
              <Window.ContentSidebarItem icon="/image/icons/folder.svg">{t('pages.main.projects_window.all')}</Window.ContentSidebarItem>
            </Window.ContentSidebar>
            <div className="flex flex-1 px-4 py-4 text-sm">
              {projects.map((project) => {
                return (
                  <div
                    key={project.title}
                    className="group flex flex-col space-y-4 text-white hover:cursor-pointer"
                    onClick={setProjectToShow.bind(null, project.code)}
                  >
                    <div className="relative h-48 w-48">
                      <Image className="rounded-lg" src={project.image} alt="Project icon" fill style={{ objectFit: 'fill' }} priority />
                      <div className="relative hidden h-full w-full bg-blue-500 opacity-50 group-hover:block"></div>
                    </div>
                    <div className="text-center group-hover:text-blue-500">{t(project.title)}</div>
                  </div>
                );
              })}
            </div>
          </Window.Content>
        </>
      )}
    </Window>
  );
};
