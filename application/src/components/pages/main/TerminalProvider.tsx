import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export type CommandLineType = {
  command: string;
  path?: string;
  delayToExecute: number;
  kind: 'shell_input' | 'shell_output';
  application: 'shell' | 'vscode';
  step: number;
  onFinish?: () => void;
};

type TerminalContextProps = {
  showProjects: boolean;
  showShellMessage: boolean;
  showToDoOptions: boolean;
  commandLinesExecuted: Map<string, CommandLineType[]>;
  currentCommandBeingExecuted: CommandLineType | undefined;
  projectToShow: (string & {}) | 'our_financial' | undefined;
  showAbout: boolean;
  showVscode: boolean;
  goToProjects: () => void;
  goToAbout: () => void;
  backToTerminal: () => void;
  setShowProjects: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectToShow: React.Dispatch<React.SetStateAction<(string & {}) | 'our_financial' | undefined>>;
  setShowAbout: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TerminalContext = React.createContext<TerminalContextProps>({
  showProjects: false,
  showShellMessage: false,
  showToDoOptions: false,
  commandLinesExecuted: new Map(),
  currentCommandBeingExecuted: undefined,
  projectToShow: undefined,
  showAbout: false,
  showVscode: false,
  goToProjects: () => undefined,
  goToAbout: () => undefined,
  backToTerminal: () => undefined,
  setShowProjects: () => undefined,
  setProjectToShow: () => undefined,
  setShowAbout: () => undefined,
});

type TerminalProviderProps = {
  children?: React.ReactNode;
};

export const TerminalProvider = ({ children }: TerminalProviderProps) => {
  const intervalIdRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const generalTimeout = useRef<NodeJS.Timeout>();
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [commandLinesExecuted, setCommandLinesExecuted] = useState<Map<'shell' | 'vscode', CommandLineType[]>>(
    new Map([
      ['shell', []],
      ['vscode', []],
    ])
  );
  const [currentCommandBeingExecuted, setCurrentCommandBeingExecuted] = useState<CommandLineType>();
  const [commandLinesToAdd, setCommandLinesToAdd] = useState<CommandLineType[]>([]);
  const [showShellMessage, setShowShellMessage] = useState(true);
  const [showToDoOptions, setShowToDoOptions] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [projectToShow, setProjectToShow] = useState<'our_financial' | (string & {}) | undefined>();
  const [showVscode, setShowVscode] = useState(false);
  const t = useTranslations();

  const executeCommand = useCallback(
    (commandToExecute: CommandLineType) => {
      setCurrentCommandBeingExecuted({
        ...commandToExecute,
        command: '',
      });

      timeoutRef.current = setTimeout(() => {
        let characterIndex = 0;
        intervalIdRef.current = setInterval(() => {
          if (characterIndex < commandToExecute.command.length) {
            setCurrentCommandBeingExecuted((oldState) => {
              if (!oldState) return undefined;

              const commandIncremented = `${oldState.command}${commandToExecute.command[characterIndex]}`;
              characterIndex++;

              return {
                ...oldState,
                command: commandIncremented,
              };
            });
          } else {
            clearInterval(intervalIdRef.current);
            setCurrentCommandIndex((oldState) => oldState + 1);
            setCommandLinesExecuted((oldState) => {
              const newMap = new Map(oldState);
              const commands = oldState.get(commandToExecute.application) || [];

              return newMap.set(commandToExecute.application, [...commands, commandToExecute]);
            });
            setCurrentCommandBeingExecuted(undefined);
            if (commandToExecute.onFinish) {
              commandToExecute.onFinish();
            }
          }
        }, commandToExecute.step);

        clearTimeout(timeoutRef.current);
      }, commandToExecute.delayToExecute);
    },
    [setCurrentCommandIndex, setCurrentCommandBeingExecuted]
  );

  const startToInsertCommands = useCallback(() => {
    if (currentCommandIndex > commandLinesToAdd.length - 1) return;

    executeCommand(commandLinesToAdd[currentCommandIndex]);
  }, [commandLinesToAdd, currentCommandIndex, executeCommand]);

  const goToProjects = () => {
    setCommandLinesToAdd([
      {
        command: t('pages.main.use_commands.commands.projects_message_1'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
      },
      {
        command: t('pages.main.use_commands.commands.projects_message_2'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
      },
      {
        command: t('pages.main.use_commands.commands.projects_message_3'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
      },
      {
        command: t('pages.main.use_commands.commands.projects_message_5'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
        onFinish: () => {
          generalTimeout.current = setTimeout(() => {
            setShowProjects(true);
            clearTimeout(generalTimeout.current);
          }, 1000);
        },
      },
    ]);
    setCurrentCommandIndex(0);
    setCommandLinesExecuted(
      new Map([
        ['shell', []],
        ['vscode', []],
      ])
    );
    setShowToDoOptions(false);
  };

  const goToAbout = () => {
    setCommandLinesToAdd([
      {
        command: t('pages.main.use_commands.commands.see_about_message_1'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
      },
      {
        command: t('pages.main.use_commands.commands.see_about_message_2'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
      },
      {
        command: t('pages.main.use_commands.commands.see_about_message_3'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
      },
      {
        command: t('pages.main.use_commands.commands.see_about_message_4'),
        delayToExecute: 100,
        kind: 'shell_output',
        application: 'shell',
        step: 10,
        onFinish: () => {
          generalTimeout.current = setTimeout(() => {
            setShowAbout(true);
            clearTimeout(generalTimeout.current);
          }, 1000);
        },
      },
    ]);
    setCurrentCommandIndex(0);
    setCommandLinesExecuted(
      new Map([
        ['shell', []],
        ['vscode', []],
      ])
    );
    setShowToDoOptions(false);
  };

  const backToTerminal = () => {
    setCommandLinesToAdd([
      {
        command: t('pages.main.use_commands.commands.hello_visitor'),
        delayToExecute: 500,
        kind: 'shell_output',
        application: 'shell',
        step: 25,
      },
      {
        command: t('pages.main.use_commands.commands.welcome'),
        delayToExecute: 500,
        kind: 'shell_output',
        application: 'shell',
        step: 25,
      },
      {
        command: t('pages.main.use_commands.commands.what_do_you_want_to_do'),
        delayToExecute: 500,
        kind: 'shell_output',
        application: 'shell',
        step: 25,
        onFinish: () => {
          generalTimeout.current = setTimeout(() => {
            setShowToDoOptions(true);
            clearTimeout(generalTimeout.current);
          }, 250);
        },
      },
    ]);
    setCurrentCommandIndex(0);
    setCommandLinesExecuted(
      new Map([
        ['shell', []],
        ['vscode', []],
      ])
    );
    setShowShellMessage(false);
    setShowToDoOptions(false);
    setShowProjects(false);
    setShowAbout(false);
  };

  useEffect(() => {
    startToInsertCommands();

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalIdRef.current);
    };
  }, [startToInsertCommands]);

  useEffect(() => {
    setCommandLinesToAdd([
      {
        command: 'cd projects',
        delayToExecute: 500,
        kind: 'shell_input',
        application: 'shell',
        step: 25,
      },
      {
        command: 'chmod +x portfolio.sh',
        path: '/projects',
        delayToExecute: 500,
        kind: 'shell_input',
        application: 'shell',
        step: 25,
      },
      // {
      //   command: 'code portfolio.sh',
      //   path: '/projects',
      //   delayToExecute: 500,
      //   kind: 'shell_input',
      //   application: 'shell',
      //   step: 25,
      //   onFinish: () => {
      //     setShowVscode(true);
      //   },
      // },
      // {
      //   command: '#!/usr/bin/env bash',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: '',
      //   delayToExecute: 10,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: 'script_root_dir="$(cd --"$(dirname --"${BASH_SOURCE[0]}")" &> /dev/null && pwd)"',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: '',
      //   delayToExecute: 10,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: 'source "$script_root_dir/utils/i18n.sh"',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: '',
      //   delayToExecute: 10,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: 'i18n "portfolio.hello"',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: 'i18n "portfolio.welcome"',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: 'i18n "portfolio.options"',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: '',
      //   delayToExecute: 10,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: 'read -p " (see_projects / see_about): " selected_option',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: '',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      // },
      // {
      //   command: './run_portfolio $selected_option',
      //   delayToExecute: 50,
      //   kind: 'shell_input',
      //   application: 'vscode',
      //   step: 10,
      //   onFinish: () => {
      //     generalTimeout.current = setTimeout(() => {
      //       setShowVscode(false);
      //       clearTimeout(generalTimeout.current);
      //     }, 1000);
      //   },
      // },
      {
        command: './portfolio.sh',
        path: '/projects',
        delayToExecute: 1000,
        kind: 'shell_input',
        application: 'shell',
        step: 25,
        onFinish: () => {
          generalTimeout.current = setTimeout(() => {
            setCommandLinesExecuted(
              new Map([
                ['shell', []],
                ['vscode', []],
              ])
            );
            setShowShellMessage(false);
            clearTimeout(generalTimeout.current);
          }, 500);
        },
      },
      {
        command: t('pages.main.use_commands.commands.hello_visitor'),
        delayToExecute: 500,
        kind: 'shell_output',
        application: 'shell',
        step: 25,
      },
      {
        command: t('pages.main.use_commands.commands.welcome'),
        delayToExecute: 500,
        kind: 'shell_output',
        application: 'shell',
        step: 25,
      },
      {
        command: t('pages.main.use_commands.commands.what_do_you_want_to_do'),
        delayToExecute: 500,
        kind: 'shell_output',
        application: 'shell',
        step: 25,
        onFinish: () => {
          generalTimeout.current = setTimeout(() => {
            setShowToDoOptions(true);
            clearTimeout(generalTimeout.current);
          }, 250);
        },
      },
    ]);
    setCurrentCommandIndex(0);
    setCommandLinesExecuted(
      new Map([
        ['shell', []],
        ['vscode', []],
      ])
    );
    setShowToDoOptions(false);
    setShowShellMessage(true);
    setShowVscode(false);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalIdRef.current);
      clearTimeout(generalTimeout.current);
    };
  }, [t, setCommandLinesToAdd, setCommandLinesExecuted, setShowToDoOptions, setCurrentCommandIndex, setShowShellMessage, setShowVscode]);

  return (
    <TerminalContext.Provider
      value={{
        showShellMessage,
        showProjects,
        commandLinesExecuted,
        currentCommandBeingExecuted,
        showToDoOptions,
        projectToShow,
        showAbout,
        showVscode,
        backToTerminal,
        goToProjects,
        setShowProjects,
        setProjectToShow,
        setShowAbout,
        goToAbout,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
