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

export default function Navbar() {
  const { toggleSidebar, sidebarOpen } = useAppContext();
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
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger>Asilbek</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Logout</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
