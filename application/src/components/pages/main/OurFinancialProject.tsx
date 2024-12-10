import { WordWindow } from '@/components/ui/systems';
import {
  ArrowsUpDownIcon,
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useContext } from 'react';
import { TerminalContext } from './TerminalProvider';

const objectives = [
  {
    text: 'pages.main.our_financial_project.movement_management',
    icon: ArrowsUpDownIcon,
  },
  {
    text: 'pages.main.our_financial_project.goals_definition',
    icon: BanknotesIcon,
  },
  {
    text: 'pages.main.our_financial_project.movement_between_accounts',
    icon: UserGroupIcon,
  },
  {
    text: 'pages.main.our_financial_project.shared_management',
    icon: UsersIcon,
  },
  {
    text: 'pages.main.our_financial_project.multiple_currencies',
    icon: CurrencyDollarIcon,
  },
  {
    text: 'pages.main.our_financial_project.personal_integration',
    icon: BuildingLibraryIcon,
  },
];

export const OurFinancialProject = () => {
  const t = useTranslations();
  const { setProjectToShow } = useContext(TerminalContext);

  return (
    <WordWindow onCloseWindow={setProjectToShow.bind(null, undefined)}>
      <WordWindow.Appbar documentTitle={t('projects.our_financial.title')}>
        <div className="grid grid-cols-2 md:flex">
          <div className="col-span-2 flex">
            <WordWindow.AppbarItem
              options={[
                {
                  name: 'Ruby on Rails',
                  icon: '/image/icons/ruby.svg',
                },
                {
                  name: 'PostgreSQL',
                  icon: '/image/icons/pgsql.svg',
                },
                {
                  name: 'Sidekiq',
                  icon: '/image/icons/shell.svg',
                },
              ]}
            >
              Backend
            </WordWindow.AppbarItem>
            <WordWindow.AppbarItem
              options={[
                {
                  name: 'Tailwind CSS',
                  icon: '/image/icons/tailwind.svg',
                },
                {
                  name: 'Next.JS',
                  icon: '/image/icons/nextjs.svg',
                },
                {
                  name: 'React',
                  icon: '/image/icons/reactjs.svg',
                },
              ]}
            >
              Frontend
            </WordWindow.AppbarItem>
          </div>
          <div className="right-0 top-0 col-span-2 flex h-full items-center justify-end px-4 py-2 sm:absolute sm:py-0">
            <Link
              href="https://our-financial.paulobacelar.dev"
              target="_blank"
              className="flex space-x-2 rounded-md border border-zinc-400 bg-orange-400 p-1 hover:bg-orange-300"
            >
              <span>{t('actions.access_demo')}</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </WordWindow.Appbar>
      <WordWindow.Workspace>
        <div className="space-y-4 py-5 min-h-[calc(100vh-176px)]">
          <div className="space-y-2">
            <h1 className="px-8 text-center text-xl md:text-left">{t('projects.our_financial.title')}</h1>
            <div className="flex justify-center overflow-hidden p-8 md:float-right md:p-12">
              <div className="md:-mr-32">
                <img
                  alt="Financial App"
                  src="/image/financial-app.png"
                  className="rounded-xl shadow-sm ring-1 ring-gray-400/10 md:max-w-md md:shadow-xl lg:max-w-lg"
                />
              </div>
            </div>
            <p className="px-8 text-center text-sm md:text-left">{t('projects.our_financial.description')}</p>
          </div>
          <div className="px-8 text-center text-sm md:text-left">{t('pages.main.our_financial_project.description')}</div>
          <ul role="list" className="space-y-2 px-8">
            {objectives.map((objective) => (
              <li key={objective.text} className="flex gap-x-3">
                <objective.icon aria-hidden="true" className="mt-1 hidden size-5 flex-none md:block" />
                <span className="text-center text-sm md:text-left">
                  {t.rich(objective.text, {
                    strong: (chunk) => <strong className="font-semibold">{chunk}</strong>,
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </WordWindow.Workspace>
    </WordWindow>
  );
};
