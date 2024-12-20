'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function LanguageMenu({ title }: { title: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (locale: string) => {
    startTransition(() => {
      const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
      router.push(newPath);
    });
  };

  // Get current language from pathname
  const getCurrentLang = () => {
    const match = pathname.match(/^\/([a-z]{2})/);
    return match ? match[1] : 'pt';
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={isPending ? 'opacity-50' : ''}>
        {title}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={() => switchLanguage('pt')}
            disabled={isPending}
            className={isPending ? 'opacity-50' : ''}
          >
            <span className="flex items-center">
              🇧🇷 Português
              {getCurrentLang() === 'pt' && (
                <span className="ml-2 text-green-500">✓</span>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => switchLanguage('en')}
            disabled={isPending}
            className={isPending ? 'opacity-50' : ''}
          >
            <span className="flex items-center">
              🇺🇸 English
              {getCurrentLang() === 'en' && (
                <span className="ml-2 text-green-500">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
