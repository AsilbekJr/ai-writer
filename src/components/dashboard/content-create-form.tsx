import { useState, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Loader2Icon } from 'lucide-react';
import type { ContentCreateRequestParam } from '@/shared/types/content-create-request-param';

type ContentCreateFormProps = {
  isLoading: boolean;
  onSubmit: (params: ContentCreateRequestParam) => void;
};

export default function ContentCreate({
  isLoading,
  onSubmit,
}: ContentCreateFormProps) {
  const [form, setForm] = useState<ContentCreateRequestParam>({
    title: '',
    description: '',
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(form);
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setForm({ ...form, [name]: value });
  };

  return (
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
  );
}
