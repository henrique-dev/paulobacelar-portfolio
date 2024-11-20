import { ContentContainer } from '@/components/ui/containers';
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
import { twJoin } from 'tailwind-merge';

const objectives = [
  {
    text: 'pages.project_our_financial.resume_section.movement_management',
    icon: ArrowsUpDownIcon,
  },
  {
    text: 'pages.project_our_financial.resume_section.goals_definition',
    icon: BanknotesIcon,
  },
  {
    text: 'pages.project_our_financial.resume_section.movement_between_accounts',
    icon: UserGroupIcon,
  },
  {
    text: 'pages.project_our_financial.resume_section.shared_management',
    icon: UsersIcon,
  },
  {
    text: 'pages.project_our_financial.resume_section.multiple_currencies',
    icon: CurrencyDollarIcon,
  },
  {
    text: 'pages.project_our_financial.resume_section.personal_integration',
    icon: BuildingLibraryIcon,
  },
];

export const ResumeSection = () => {
  const t = useTranslations();

  return (
    <ContentContainer className="lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div
          className={twJoin(
            'lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid',
            'lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'
          )}
        >
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <Link
                href={'https://our-financial.paulobacelar.dev'}
                className={twJoin(
                  'group flex items-center space-x-1 text-base/7 font-semibold',
                  'text-main-500 hover:text-main-600 dark:text-main-400 dark:hover:text-main-500'
                )}
                target="_blank"
              >
                <p>{t('actions.access_demo')}</p>
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </Link>
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl dark:text-white">
                {t('projects.our_financial.title')}
              </h1>
              <p className="mt-6 text-xl/8 text-gray-500 dark:text-gray-300">{t('projects.our_financial.description')}</p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Financial App"
            src="/image/financial-app.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-700 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div
          className={twJoin(
            'lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto',
            'lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'
          )}
        >
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg dark:text-white">
              <p>{t('pages.project_our_financial.resume_section.description')}</p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                {objectives.map((objective) => (
                  <li key={objective.text} className="flex gap-x-3">
                    <objective.icon aria-hidden="true" className="mt-1 size-5 flex-none text-main-600 dark:text-main-500" />
                    <span className="text-gray-700 dark:text-white">
                      {t.rich(objective.text, {
                        strong: (chunk) => <strong className="font-semibold text-gray-700 dark:text-white">{chunk}</strong>,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};
