import type { TPromptHistory } from '@/shared/types/propmt-history.type';
import { Link } from 'react-router-dom';

type TPromptHistoryProps = {
  items: TPromptHistory[];
};

export default function PromptHistory({ items }: TPromptHistoryProps) {
  return (
    <nav className="mt-8">
      {items.map((item) => (
        <div key={item.date} className="mt-4">
          <h5 className="text-sm text-gray-400 mt-8 font-bold">{item.date}</h5>
          <nav className="mt-2">
            {item.links.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className="flex items-center rounded-md font-medium text-sm hover:bg-neutral-100 px-3 py-2"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </nav>
  );
}
