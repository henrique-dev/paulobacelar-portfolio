import { GithubLink, LinkedinLink } from '@/components/ui/links';
import { Window } from '@/components/ui/systems';
import { BookOpenIcon, UserIcon } from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { TerminalContext } from './TerminalProvider';

type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  containerTitle?: string;
};

const Container = ({ containerTitle, className, children, ...rest }: ContainerProps) => {
  return (
    <div {...rest} className={twMerge('mx-1 space-y-2 px-4 py-2 md:mx-16', className)}>
      {containerTitle && <h1 className="text-base text-white">{containerTitle}</h1>}
      <div className={twJoin('flex flex-col divide-y border px-4', 'divide-zinc-700 border-zinc-700 bg-zinc-800 text-white')}>
        {children}
      </div>
    </div>
  );
};

const Switch = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-y-2 py-3">
      <div className="flex-1">{children}</div>
      <div className="flex justify-end">
        <div className="flex h-5 w-9 cursor-pointer items-center justify-end rounded-full border border-zinc-600 bg-blue-500">
          <div className="mr-0.5 h-4 w-4 rounded-full border-zinc-900 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export const AboutMe = () => {
  const { showAbout, backToTerminal } = useContext(TerminalContext);
  const [currentMenu, setCurrentMenu] = useState<'description' | 'skills' | 'contact'>('description');
  const t = useTranslations();

  if (!showAbout) return undefined;

  return (
    <Window onCloseWindow={backToTerminal} windowTitle={t('pages.main.about_me.title')}>
      {(fullscreen) => (
        <Window.Content>
          <Window.ContentSidebar>
            <Window.ContentSidebarItemWithoutIcon onClick={setCurrentMenu.bind(null, 'description')} active={currentMenu === 'description'}>
              <UserIcon className="h-5 w-5" />
              <div className="hidden sm:block">{t('pages.main.about_me.description')}</div>
            </Window.ContentSidebarItemWithoutIcon>
            <Window.ContentSidebarItemWithoutIcon onClick={setCurrentMenu.bind(null, 'skills')} active={currentMenu === 'skills'}>
              <BookOpenIcon className="h-5 w-5" />
              <div className="hidden sm:block">{t('pages.main.about_me.skills')}</div>
            </Window.ContentSidebarItemWithoutIcon>
          </Window.ContentSidebar>
          <div
            className={twMerge(
              'flex-1 items-center overflow-auto rounded-br-lg bg-zinc-700/50 py-4 text-sm',
              fullscreen && 'max-h-[calc(100vh-38px)] md:max-h-[calc(100vh-38px)]',
              !fullscreen && 'max-h-[calc(100vh-38px)] md:max-h-[562px]'
            )}
          >
            {currentMenu === 'description' && (
              <div className="flex w-full flex-col space-y-4">
                <div className="flex justify-center">
                  <div className="relative mx-4 h-32 w-32 md:mx-0">
                    <Image
                      className="rounded-full"
                      src={'/image/profile.jpeg'}
                      alt="Project icon"
                      fill
                      style={{ objectFit: 'fill' }}
                      priority
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-x-6">
                  <GithubLink />
                  <LinkedinLink />
                </div>
                <Container>
                  <div className="flex gap-y-2 py-3">
                    <div className="flex-1">{t('pages.main.about_me.name')}</div>
                    <div>Paulo Bacelar</div>
                  </div>
                  <Switch>{t('pages.main.about_me.position')}</Switch>
                  <div className="gap-y-2 py-3">
                    <div className="text-center">{t('pages.main.about_me.about_text')}</div>
                  </div>
                </Container>
              </div>
            )}
            {currentMenu === 'skills' && (
              <div className="flex w-full flex-col">
                <Container containerTitle={t('pages.main.about_me.languages')}>
                  <Switch>Ruby</Switch>
                  <Switch>Javascript</Switch>
                  <Switch>Typescript</Switch>
                  <Switch>C++</Switch>
                  <Switch>Java</Switch>
                </Container>
                <Container containerTitle="Frameworks">
                  <Switch>Ruby on Rails</Switch>
                  <Switch>Next.js</Switch>
                  <Switch>React Native</Switch>
                </Container>
                <Container containerTitle="Frontend">
                  <Switch>React.js</Switch>
                  <Switch>Tailwind CSS</Switch>
                </Container>
                <Container containerTitle={t('pages.main.about_me.databases')}>
                  <Switch>MySQL</Switch>
                  <Switch>PostgreSQL</Switch>
                  <Switch>MongoDB</Switch>
                  <Switch>Redis</Switch>
                </Container>
                <Container containerTitle={t('pages.main.about_me.messaging')}>
                  <Switch>Sidekiq</Switch>
                  <Switch>BullMQ</Switch>
                  <Switch>RabbitMQ</Switch>
                </Container>
              </div>
            )}
            {currentMenu === 'contact' && <div>competencies</div>}
          </div>
        </Window.Content>
      )}
    </Window>
  );
};
