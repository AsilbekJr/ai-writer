import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '@/contexts/app.context';
import { useAuthContext } from '@/contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

enum LanguageCode {
  English = 'en',
  Uzebek = 'uz',
}

type TLanguage = {
  label: string;
  flag: string;
};

const LANGUAGES: { [code in LanguageCode]: TLanguage } = {
  [LanguageCode.English]: {
    label: 'English',
    flag: 'https://canadianaflag.ca/cdn/shop/files/union-jack-british-flag-623121.jpg?v=1741108802&width=1920',
  },
  [LanguageCode.Uzebek]: {
    label: 'Uzbek',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1200px-Flag_of_Uzbekistan.svg.png',
  },
};

export default function Navbar() {
  const { toggleSidebar, sidebarOpen } = useAppContext();
  const [activeLanguage, setActiveLanguage] = useState<TLanguage>(LANGUAGES.en);
  const { user, logoutUser } = useAuthContext();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate('/auth/login');
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  };
  useEffect(() => {
    setActiveLanguage(LANGUAGES[i18n.language as LanguageCode]);
  }, [i18n.language]);

  return (
    <div className="border-b">
      <nav className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2">
          <Button
            className="block md:hidden"
            variant={'outline'}
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </Button>
          <h4 className="font-semibold">Dashboard</h4>
        </div>
        <div className="p-4 flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger> {user?.login}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel onClick={handleLogout}>
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img className="w-6 h-4" src={activeLanguage.flag} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(LANGUAGES).map(([code, { label }]) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => changeLanguage(code)}
                  key={code}
                >
                  {label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
