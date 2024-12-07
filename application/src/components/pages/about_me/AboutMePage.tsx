'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { twJoin } from 'tailwind-merge';
import { GithubLink } from './GithubLink';
import { LinkedinLink } from './LinkedinLink';

const SkillTitle = ({ title }: { title: string }) => {
  return <h3 className="mt-6 text-center text-base/7 font-semibold tracking-tight text-gray-700 dark:text-white">{title}</h3>;
};

const SkillBar = ({ skill, years, percent }: { skill: string; years: string; percent: string }) => {
  const t = useTranslations('general');

  return (
    <div className="grid grid-cols-12 text-center text-sm/6 text-gray-700 dark:text-white">
      <div className="col-span-3">{skill}</div>
      <div className={twJoin('col-span-6 my-0.5 h-auto rounded-md border border-gray-300 dark:border-gray-200', percent)}>
        <div className="h-full rounded-md bg-main-500 dark:bg-main-400"></div>
      </div>
      <div className="col-span-3">{t('years', { n: years })}</div>
    </div>
  );
};

export const AboutMePage = () => {
  const shortCardRef = useRef<HTMLDivElement | null>(null);
  const fullCardRef = useRef<HTMLDivElement | null>(null);
  const isPerformingActionRef = useRef(false);
  const intervalIdRef = useRef<NodeJS.Timeout>();
  const t = useTranslations('pages.about_me.about_me_page');

  const endRotate = () => {
    const fullContainer = fullCardRef.current;

    if (!fullContainer) return;

    fullContainer.style.display = 'block';
    fullContainer.style.transform = 'rotateY(90deg)';

    let degree = 90;
    intervalIdRef.current = setInterval(() => {
      degree -= 10;

      fullContainer.style.transform = `rotateY(${degree}deg)`;

      if (degree < 0) {
        clearInterval(intervalIdRef.current);
      }
    }, 25);
  };

  const startRotate = () => {
    const shortContainer = shortCardRef.current;

    if (!shortContainer) return;

    isPerformingActionRef.current = true;

    let degree = 0;
    intervalIdRef.current = setInterval(() => {
      degree += 10;

      shortContainer.style.transform = `rotateY(${degree}deg)`;

      if (degree >= 90) {
        shortContainer.style.display = 'none';
        clearInterval(intervalIdRef.current);
        endRotate();
      }
    }, 25);
  };

  const rotateContainerHandler = () => {
    if (isPerformingActionRef.current) return;

    startRotate();
  };

  return (
    <div className="flex justify-center">
      <div ref={shortCardRef} className="rounded-2xl bg-white shadow dark:bg-gray-600">
        <div className="px-8 py-10">
          <img alt="Profile Picture" src={'/image/profile.jpeg'} className="mx-auto size-48 rounded-full md:size-56" />
          <h3 className="mt-6 text-center text-base/7 font-semibold tracking-tight text-gray-700 dark:text-white">Paulo Bacelar</h3>
          <p className="text-center text-sm/6 text-gray-700 dark:text-white">Software Developer</p>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <GithubLink />
            <LinkedinLink />
          </div>
        </div>
        <button
          onClick={rotateContainerHandler}
          className="w-full rounded-b-2xl bg-main-500 py-4 text-white hover:bg-main-600 dark:bg-main-400 dark:hover:bg-main-500"
        >
          Quero saber mais
        </button>
      </div>
      <div ref={fullCardRef} className="hidden max-w-3xl rounded-2xl bg-white shadow dark:bg-gray-600">
        <div className="px-8 py-10">
          <img alt="Profile Picture" src={'/image/profile.jpeg'} className="mx-auto size-48 rounded-full md:size-56" />
          <h3 className="mt-6 text-center text-xl/7 font-semibold tracking-tight text-gray-700 dark:text-white">Paulo Bacelar</h3>
          <p className="text-center text-sm/6 text-gray-700 dark:text-white">Software Developer</p>
          <p className="text-center text-sm/6 text-gray-700 dark:text-white">{t('description')}</p>
          <div className="space-y-4">
            <SkillTitle title="Top Skills" />
            <SkillBar skill="Ruby on Rails" years="6" percent="w-full" />
            <SkillBar skill="Next.Js" years="4" percent="w-2/3" />
            <SkillBar skill="React.Js" years="4" percent="w-2/3" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <GithubLink />
            <LinkedinLink />
          </div>
        </div>
      </div>
    </div>
  );
};
