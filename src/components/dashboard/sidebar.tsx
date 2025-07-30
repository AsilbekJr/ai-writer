import { useAppContext } from '@/contexts/app.context';
import PromptHistory from './prompt-history';
import type { TPromptHistory } from '@/shared/types/propmt-history.type';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Loader2 } from 'lucide-react';

const mockItems: TPromptHistory[] = [
  {
    date: 'Today',
    links: [
      {
        title: 'Prompt 1',
        url: 'dashboard/propmt/1',
      },
      {
        title: 'Prompt 2',
        url: 'dashboard/propmt/2',
      },
    ],
  },
  {
    date: 'Yesterday',
    links: [
      {
        title: 'Prompt 1',
        url: 'dashboard/propmt/1',
      },
      {
        title: 'Prompt 2',
        url: 'dashboard/propmt/2',
      },
    ],
  },
];

export default function Sidebar() {
  const { generatingContent } = useAppContext();
  return (
    <nav className="h-screen w-80 border-r p-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI Writer</h1>
        <button>
          {generatingContent ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <PencilSquareIcon className="w-6" />
          )}
        </button>
      </div>
      <PromptHistory items={mockItems} />
    </nav>
  );
}
