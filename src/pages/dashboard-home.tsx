import ContentCreate from '@/components/dashboard/content-create-form';
import { useContentContext } from '@/contexts/content.context';
import type { TContentCreateRequestParam } from '@/shared/types/content-create-request-param';
import { useNavigate } from 'react-router-dom';

export default function DashboardHome() {
  const { generateContent, generatingContent } = useContentContext();
  const navigate = useNavigate();

  const handleSubmit = async (params: TContentCreateRequestParam) => {
    const result = await generateContent(params);
    if (result) {
      navigate(`/dashboard/content/${result.id}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Article writer</h1>
      <ContentCreate isLoading={generatingContent} onSubmit={handleSubmit} />
    </div>
  );
}
