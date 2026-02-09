'use client';
import { ErrorMessage } from '@/app/components';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '@/app/generated/prisma/client';
import dynamic from 'next/dynamic';

type IssueFormData = z.infer<typeof issueSchema>;

const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch('/api/issues/' + issue.id, data);
      else await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      setError('An Unexpected Error Occurred!');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
