import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import LoginButton from './loginButton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LanguageMenu from '@/components/language-menu';
import { getTranslations } from 'next-intl/server';
import { SignOutButton } from './Actions/auth';

// interface NavBarProps {
//   params: {
//     lang: string;
//   };
// }

export default async function NavBar() {
  const t = await getTranslations('Navigation'); // Componente do servidor: const t = await getTranslations('HomePage'); ASSINCRONO
  // const t = useTranslations('Navigation'); // Componente do servidor: const t = useTranslations('HomePage'); SINCRONO
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            CursON
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('categories')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link
                      href="/categories/programming"
                      className="block p-2 hover:bg-slate-200 rounded-md"
                    >
                      {t('programming')}
                    </Link>
                    <Link
                      href="/categories/design"
                      className="block p-2 hover:bg-slate-200 rounded-md"
                    >
                      {t('design')}
                    </Link>
                    <Link
                      href="/categories/data"
                      className="block p-2 hover:bg-slate-200 rounded-md"
                    >
                      {t('data')}
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex-1 max-w-xl px-6">
          <Input type="search" placeholder={t('search')} className="w-full" />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <ShoppingCart
              size={24}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <div className="relative cursor-pointer">
            <Bell
              size={24}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </div>

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.user.image || ''} />
                  <AvatarFallback>{t('profile')}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-center">
                  {t('menu.profile')}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('menu.courses')}</DropdownMenuItem>
                <DropdownMenuItem>{t('menu.cart')}</DropdownMenuItem>
                <DropdownMenuItem>{t('menu.teach')}</DropdownMenuItem>
                <DropdownMenuItem>{t('menu.signature')}</DropdownMenuItem>
                <LanguageMenu title={t('menu.language')} />
                <DropdownMenuItem>{t('menu.settings')}</DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton name={t('menu.logout')} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginButton contentTitle={t('login')} />
          )}
        </div>
      </nav>
    </header>
  );
}
