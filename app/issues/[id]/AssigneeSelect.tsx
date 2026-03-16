'use client';
import { Issue, User } from '@/app/generated/prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  const assignIssue = (userId: string) => {
    return axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId !== 'unassigned' ? userId : null,
      })
      .catch(() => toast.error('Failed to update assignee'));
  };

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minute
    retry: 3, // Retry up to 3 times on failure
  });

export default AssigneeSelect;
