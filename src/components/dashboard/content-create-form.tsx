import { Button } from '../ui/button';
import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { Textarea } from '../ui/textarea';
import { Loader2Icon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import type { TContentCreateRequestParam } from '@/shared/types/content-create-request-param';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type ContentCreateFormProps = {
  isLoading: boolean;
  onSubmit: (params: TContentCreateRequestParam) => void;
};
const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title kamida 5 ta simvoldan iborat bo'lishi kerak")
    .max(50),
  description: z
    .string()
    .min(20, "Description kamida 20 ta simvoldan iborat bo'lishi kerak")
    .max(1000),
});

export default function ContentCreate({
  isLoading,
  onSubmit,
}: ContentCreateFormProps) {
  // const [form, setForm] = useState<ContentCreateRequestParam>({
  //   title: '',
  //   description: '',
  // });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });
  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }
  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault();
  //   onSubmit(form);
  // };

  // const handleChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setForm({ ...form, [name]: value });
  // };

  return (
    // <form className="mt-4" onSubmit={handleSubmit}>
    //   <div className="grid w-full  items-center gap-3 mb-4">
    //     <Label htmlFor="title">Title</Label>
    //     <Input
    //       onChange={handleChange}
    //       type="text"
    //       id="title"
    //       name="title"
    //       placeholder="Title"
    //       disabled={isLoading}
    //     />
    //   </div>
    //   <div className="grid w-full items-center gap-3 mb-4">
    //     <Label htmlFor="description">Description</Label>
    //     <Textarea
    //       onChange={handleChange}
    //       placeholder="Type your description here."
    //       id="description"
    //       name="description"
    //       disabled={isLoading}
    //     />
    //   </div>
    //   <Button disabled={isLoading} type="submit">
    //     {isLoading && <Loader2Icon className="animate-spin" />}
    //     Generate
    //   </Button>
    // </form>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2 md:space-y-4 md:mt-4 mt-2"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="ReactJS" {...field} />
              </FormControl>
              <FormDescription>
                Pleace provide a title for your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Write about react js form validation"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Pleace provide a description for your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Loader2Icon className="animate-spin" />}
          Generate
        </Button>
      </form>
    </Form>
  );
}
