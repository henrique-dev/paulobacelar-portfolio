import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { useFormatter, useTranslations } from 'next-intl';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

const projects = [
  {
    title: 'projects.our_financial.title',
    description: 'projects.our_financial.description',
    url: '/projects/our-financial',
    date: '2024-11-19',
    tags: ['Next.JS', 'Ruby on Rails', 'PostgreSQL'],
    image: '/image/financial-app.png',
  },
];

export const ProjectsPage = () => {
  const t = useTranslations();
  const formatter = useFormatter();

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.title}
          href={project.url}
          className={twJoin(
            'group rounded-2xl bg-white shadow hover:opacity-95 dark:bg-gray-600',
            'flex flex-col items-start justify-between p-4'
          )}
        >
          <div className="relative w-full">
            <img
              src={project.image}
              alt="Project image"
              className="aspect-video w-full rounded-xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="max-w-xl">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <time dateTime={project.date} className="text-gray-500 dark:text-gray-400">
                {formatter.dateTime(new Date(project.date))}
              </time>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="relative z-10 rounded-full bg-main-50 px-3 py-1.5 font-medium text-gray-700 dark:bg-main-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="group relative">
              <h3
                className={twJoin(
                  'mt-3 flex items-center space-x-1 text-lg/6 font-semibold',
                  'text-gray-900 group-hover:text-main-600 dark:text-white',
                  'dark:group-hover:text-main-400'
                )}
              >
                <span>
                  <span className="absolute inset-0" />
                  {t(project.title)}
                </span>
                <ArrowTopRightOnSquareIcon className="hidden h-5 w-5 group-hover:block" />
              </h3>
              <p className="mt-5 line-clamp-3 text-sm/6 text-gray-700 dark:text-white">{t(project.description)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
