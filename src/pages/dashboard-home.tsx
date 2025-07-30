import ContentCreate from '@/components/dashboard/content-create-form';
import ContentViewer from '@/components/dashboard/content-viewer';
import { useAppContext } from '@/contexts/app.context';
import type { ContentCreateRequestParam } from '@/shared/types/content-create-request-param';
import { generateArticle } from '@/utilis/gemini';
import { useState } from 'react';

export default function DashboardHome() {
  const [content, setContent] = useState<string | null>(null);
  const { generatingContent, setGeneratingContent } = useAppContext();

  const handleSubmit = async (params: ContentCreateRequestParam) => {
    setGeneratingContent(true);
    const { title, description } = params;
    const result = await generateArticle(title, description);
    setContent(result);
    setGeneratingContent(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Article writer</h1>
      {content ? (
        <ContentViewer content={content} />
      ) : (
        <ContentCreate isLoading={generatingContent} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
