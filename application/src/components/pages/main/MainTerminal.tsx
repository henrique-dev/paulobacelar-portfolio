import { Terminal, Vscode } from '@/components/ui/systems';
import { useContext } from 'react';
import { twJoin } from 'tailwind-merge';
import { useTranslations } from 'use-intl';
import { CommandLineType, TerminalContext } from './TerminalProvider';

const CommandLine = ({ command }: { command: CommandLineType }) => {
  const t = useTranslations();

  return (
    <>
      {command.application === 'shell' && (
        <div className="flex text-base text-green-500">
          {command.kind == 'shell_input' && (
            <>
              <p>{t('pages.main.main_terminal.host_machine')}</p>
              <p className="text-white">:</p>
              <p className="text-blue-500">~{command.path}</p>
              <p className="pr-2 text-white">$</p>
            </>
          )}
          <p className="text-white">{command.command}</p>
        </div>
      )}
      {command.application === 'vscode' && (
        <div className="flex whitespace-nowrap text-xs text-green-500">
          <p className="text-white">{command.command === '' ? <>&nbsp;</> : command.command}</p>
        </div>
      )}
    </>
  );
};

export const MainTerminal = () => {
  const { commandLinesExecuted, currentCommandBeingExecuted, showShellMessage, showToDoOptions, showVscode, goToProjects, goToAbout } =
    useContext(TerminalContext);
  const t = useTranslations();

  const shellCommands = commandLinesExecuted.get('shell') || [];
  const vscodeCommands = commandLinesExecuted.get('vscode') || [];

  return (
    <>
      <Terminal className={twJoin('relative', showVscode ? 'hidden' : 'flex')}>
        <div className="flex flex-1 flex-col px-4 py-2">
          {showShellMessage && (
            <div className="py-2 text-base text-green-500">
              <p className="">Portfolio Shell</p>
              <p className="">&copy; {t('pages.main.main_terminal.all_rights_reserved', { char: '&copy;' })}</p>
            </div>
          )}
          {shellCommands.map((commandLine, index) => (
            <CommandLine key={index} command={commandLine} />
          ))}
          {currentCommandBeingExecuted && currentCommandBeingExecuted.application === 'shell' && (
            <CommandLine command={currentCommandBeingExecuted} />
          )}
          {showToDoOptions && (
            <>
              <div className="flex flex-1 items-start justify-start space-x-4 p-2 text-white">
                <div
                  onClick={goToProjects}
                  className={twJoin(
                    'flex items-center justify-center',
                    'border-b border-green-500 px-2 text-center hover:cursor-pointer hover:bg-green-800'
                  )}
                >
                  {t('pages.main.main_terminal.see_projects')}
                </div>
                <div
                  onClick={goToAbout}
                  className={twJoin(
                    'flex items-center justify-center',
                    'border-b border-green-500 px-2 text-center hover:cursor-pointer hover:bg-green-800'
                  )}
                >
                  {t('pages.main.main_terminal.see_about')}
                </div>
              </div>
            </>
          )}
        </div>
      </Terminal>
      <Vscode className={twJoin(showVscode ? 'flex' : 'hidden')} windowTitle="Code">
        {vscodeCommands.map((commandLine, index) => (
          <CommandLine key={index} command={commandLine} />
        ))}
        {currentCommandBeingExecuted && currentCommandBeingExecuted.application === 'vscode' && (
          <CommandLine command={currentCommandBeingExecuted} />
        )}
      </Vscode>
    </>
  );
};
