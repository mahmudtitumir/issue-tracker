'use client';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();
  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={handleSubmit(async data => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextField.Root placeholder="Title" {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
