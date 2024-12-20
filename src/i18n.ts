import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Locale } from './app/i18n/types';

const locales = ['en', 'pt'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`@/app/i18n/dictionaries/${locale}.json`)).default,
  };
});
