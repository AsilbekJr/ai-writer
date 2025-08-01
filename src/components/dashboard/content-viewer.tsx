type ContentViewerProps = {
  content: string;
};
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Markdown from 'react-markdown';
import { Button } from '../ui/button';
import {
  ShareIcon,
  ClipboardDocumentIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
export default function ContentViewer({ content }: ContentViewerProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Nusxa olindi');
    } catch (error) {
      console.error('Nusxa olinmadi', error);
      toast.error('Nusxa olinmadi (');
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-1xl">
          {' '}
          <Markdown>{content}</Markdown>{' '}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant={'outline'}>
          <ShareIcon className="h-4 w-4" />
        </Button>
        <Button variant={'outline'} onClick={handleCopy}>
          <ClipboardDocumentIcon className="w-4 h-4" />
        </Button>
        <Button variant={'outline'}>
          <StarIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
