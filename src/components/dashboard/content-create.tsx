import { useState, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Loader2Icon } from 'lucide-react';

export default function ContentCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(form);
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="text-3xl font-semibold">
      <h1>Article writer</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="grid w-full  items-center gap-3 mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            placeholder="Email"
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
    </div>
  );
}
