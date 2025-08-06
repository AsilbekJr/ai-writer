import { useAppContext } from '@/contexts/app.context';
import PromptHistory from './prompt-history';
// import type { TPromptHistory } from '@/shared/types/propmt-history.type';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useContentContext } from '@/contexts/content.context';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { sidebarOpen } = useAppContext();
  const { generatingContent, getPromtHistory } = useContentContext();

  const historyItems = getPromtHistory();

  return (
    <nav
      className={clsx(
        'transition-all duration-500 h-screen overflow-x-hidden md:w-80 md:border-r md:p-4',
        sidebarOpen ? 'w-1/2 border-r p-2' : 'w-0'
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI Writer</h1>
        <button>
          {generatingContent ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Link to={'/dashboard'}>
              <PencilSquareIcon className="w-6" />
            </Link>
          )}
        </button>
      </div>
      <PromptHistory items={historyItems} />
    </nav>
  );
}
