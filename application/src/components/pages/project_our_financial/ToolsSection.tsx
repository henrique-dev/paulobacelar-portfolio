import { ContentContainer } from '@/components/ui/containers';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-gray-700 dark:text-white text-base/7">{children}</p>;
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="my-4 mt-8 font-bold text-gray-700 dark:text-white text-base/7">{children}</h1>;
};

const List = ({ title, options }: { title?: string; options: { text: string }[] }) => {
  const t = useTranslations();

  return (
    <>
      <h2 className="my-4 font-bold text-gray-700 dark:text-white text-base/7">{title}</h2>
      <ul role="list" className="space-y-4 text-gray-700">
        {options.map((option) => (
          <li key={option.text} className="flex gap-x-3">
            <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-main-600 dark:text-main-500" />
            <span className="text-gray-700 dark:text-white text-base/7">
              {t.rich(option.text, {
                strong: (chunk) => <strong className="font-semibold text-gray-700 dark:text-white">{chunk}</strong>,
              })}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export const ToolsSection = () => {
  const t = useTranslations();

  return (
    <ContentContainer className="2xl:px-32 px-8 sm:px-8 md:px-8 lg:px-8 xl:px-8">
      <Description>{t('pages.project_our_financial.tools_section.general_description')}</Description>
      <Title>{t('pages.project_our_financial.tools_section.frontend')}</Title>
      <Description>{t('pages.project_our_financial.tools_section.frontend_description')}</Description>
      <List
        title={t('pages.project_our_financial.tools_section.nextjs')}
        options={[
          {
            text: 'pages.project_our_financial.tools_section.nextjs_text1',
          },
          {
            text: 'pages.project_our_financial.tools_section.nextjs_text2',
          },
          {
            text: 'pages.project_our_financial.tools_section.nextjs_text3',
          },
        ]}
      />

      <List
        title={t('pages.project_our_financial.tools_section.tailwindcss')}
        options={[
          {
            text: 'pages.project_our_financial.tools_section.tailwindcss_text1',
          },
          {
            text: 'pages.project_our_financial.tools_section.tailwindcss_text2',
          },
        ]}
      />

      <Title>{t('pages.project_our_financial.tools_section.backend')}</Title>
      <Description>{t('pages.project_our_financial.tools_section.backend_description')}</Description>
      <List
        title={t('pages.project_our_financial.tools_section.ruby_on_rails')}
        options={[
          {
            text: 'pages.project_our_financial.tools_section.ruby_on_rails_text1',
          },
          {
            text: 'pages.project_our_financial.tools_section.ruby_on_rails_text2',
          },
        ]}
      />
      <List
        title={t('pages.project_our_financial.tools_section.postgres')}
        options={[
          {
            text: 'pages.project_our_financial.tools_section.postgres_text1',
          },
          {
            text: 'pages.project_our_financial.tools_section.postgres_text2',
          },
        ]}
      />
      <Title>{t('pages.project_our_financial.tools_section.backend_frontend')}</Title>
      <Description>{t('pages.project_our_financial.tools_section.backend_frontend_description')}</Description>
      <List
        options={[
          {
            text: 'pages.project_our_financial.tools_section.backend_frontend_text1',
          },
          {
            text: 'pages.project_our_financial.tools_section.backend_frontend_text2',
          },
          {
            text: 'pages.project_our_financial.tools_section.backend_frontend_text3',
          },
        ]}
      />
      <Title>{t('pages.project_our_financial.tools_section.design_system')}</Title>
      <List
        options={[
          {
            text: 'pages.project_our_financial.tools_section.design_system_text1',
          },
          {
            text: 'pages.project_our_financial.tools_section.design_system_text2',
          },
          {
            text: 'pages.project_our_financial.tools_section.design_system_text3',
          },
          {
            text: 'pages.project_our_financial.tools_section.design_system_text4',
          },
        ]}
      />
    </ContentContainer>
  );
};
