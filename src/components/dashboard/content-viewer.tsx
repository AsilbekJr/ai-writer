type ContentViewerProps = {
  generatedContent: TGeneratedContent;
  onSave: (generatedContent: TGeneratedContent) => void;
};
import MDEditor from '@uiw/react-md-editor';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '../ui/button';
import {
  ShareIcon,
  ClipboardDocumentIcon,
  StarIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import type { TGeneratedContent } from '@/shared/types/generating-content';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
enum Mode {
  view,
  edit,
}
export default function ContentViewer({
  generatedContent,
  onSave,
}: ContentViewerProps) {
  const [editedContent, setEditedContent] = useState<string>(
    generatedContent.content
  );
  const [mode, setMode] = useState<Mode>(Mode.view);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent.content);
      toast.success('Nusxa olindi');
    } catch (error) {
      console.error('Nusxa olinmadi', error);
      toast.error('Nusxa olinmadi (');
    }
  };

  const handleEdit = () => {
    setMode(Mode.edit);
  };
  const handleContentChange = (value?: string) => {
    setEditedContent(value || '');
  };

  const handleCancel = () => {
    setMode(Mode.view);
    setEditedContent(generatedContent.content);
  };
  const handleSave = () => {
    onSave({ ...generatedContent, content: editedContent });
    setMode(Mode.view);
  };
  return mode === Mode.view ? (
    <Card>
      <CardContent className="p-4 md:p-6 lg:p-8">
        <div className="text-1xl">
          {' '}
          <MDEditor.Markdown
            source={editedContent}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'outline'} onClick={handleEdit}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Content</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'outline'}>
              <ShareIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share Content</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'outline'} onClick={handleCopy}>
              <ClipboardDocumentIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy Content</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  ) : (
    <div>
      <MDEditor
        className="mt-4"
        height={400}
        value={editedContent}
        onChange={handleContentChange}
      />
      <div className="mt-4 flex gap-3">
        <Button onClick={handleSave}>Save</Button>
        <Button variant={'destructive'} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
