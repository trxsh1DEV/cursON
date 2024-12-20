import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import NavBar from '@/components/nav';
import { notFound } from 'next/navigation';

const geistOpenSans = Open_Sans({
  variable: '--font-geist-open-sans',
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'Online Course Platform - Learn and Grow',
  description:
    'Join our platform to access a variety of online courses and enhance your skills.',
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params; // Aguarde params antes de usar

  let messages;
  try {
    messages = (await import(`@/app/i18n/dictionaries/${locale}.json`)).default;
  } catch (err: unknown) {
    console.log(err);
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistOpenSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          <main className="pt-16">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
