import { useState, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Loader2Icon } from 'lucide-react';
import { generateArticle } from '@/utilis/gemini';
import ContentViewer from './content-viewer';

export default function ContentCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [content, setContent] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await generateArticle(form.title, form.description);
    setContent(result);
    setForm({
      title: '',
      description: '',
    });
    setIsLoading(false);
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Article writer</h1>
      {content ? (
        <ContentViewer content={content} />
      ) : (
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="grid w-full  items-center gap-3 mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={handleChange}
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              disabled={isLoading}
            />
          </div>
          <div className="grid w-full items-center gap-3 mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              onChange={handleChange}
              placeholder="Type your description here."
              id="description"
              name="description"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2Icon className="animate-spin" />}
            Generate
          </Button>
        </form>
      )}
    </div>
  );
}
