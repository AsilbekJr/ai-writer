import ContentViewer from '@/components/dashboard/content-viewer';
import { useContentContext } from '@/contexts/content.context';
import type { TGeneratedContent } from '@/shared/types/generating-content';
import { StarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DashboardContent() {
  const [generatedContent, setGeneratedContent] = useState<TGeneratedContent>();
  const { getContentById, updateById } = useContentContext();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const result = getContentById(id);
      setGeneratedContent(result);
    }
  }, [id, getContentById]);

  const handleSave = (generatedContent: TGeneratedContent) => {
    updateById(generatedContent.id, generatedContent);
  };

  if (!generatedContent) {
    return <h3>Not Found</h3>;
  }

  const handleChangeRate = (rate: number) => {
    if (generatedContent) {
      handleSave({
        ...generatedContent,
        rate,
      });
    }
  };

  return (
    <div>
      <div className="flex gap-1">
        <h1 className="text-3xl font-semibold my-3">
          {generatedContent.title}
        </h1>
        <div className="flex gap-1 items-center">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon
                onClick={() => handleChangeRate(index + 1)}
                className={clsx(
                  'w-7 h-7 cursor-pointer',
                  (generatedContent.rate || 0) > index && 'fill-black'
                )}
              />
            ))}
        </div>
      </div>
      <ContentViewer
        generatedContent={generatedContent}
        key={generatedContent.id}
        onSave={handleSave}
      />
    </div>
  );
}
