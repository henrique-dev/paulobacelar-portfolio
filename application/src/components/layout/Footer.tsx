import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('layout.footer');

  return (
    <footer>
      <div className="px-6 py-6 flex justify-center lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">&copy; {t('all_rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
};
