import ContentCreate from '@/components/dashboard/content-create-form';
import ContentViewer from '@/components/dashboard/content-viewer';
import { useContentContext } from '@/contexts/content.context';
import type { TContentCreateRequestParam } from '@/shared/types/content-create-request-param';
import { generateArticle } from '@/utilis/gemini';
import { useState } from 'react';

export default function DashboardHome() {
  const [content, setContent] = useState<string | null>(null);
  const { generateContent, generatingContent } = useContentContext();

  const handleSubmit = async (params: TContentCreateRequestParam) => {
    const result = await generateContent(params);

    setContent(result);
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
