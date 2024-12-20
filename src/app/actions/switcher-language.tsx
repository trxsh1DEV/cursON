'use client';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => switchLanguage('en')}>EN</button>
      <button onClick={() => switchLanguage('pt')}>PT</button>
    </div>
  );
}
