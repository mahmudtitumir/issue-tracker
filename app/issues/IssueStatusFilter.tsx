'use client';

import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { Status } from '../generated/prisma/enums';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'All'}
      onValueChange={(status: string) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (status === 'All') params.delete('status');
        if (searchParams.has('orderBy')) {
          const orderBy = searchParams.get('orderBy');
          params.delete('orderBy');
          params.append('orderBy', orderBy!);
        }
        const query = params.size ? `?${params.toString()}` : '';
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter By Status.." />
      <Select.Content>
        {statuses.map(statuses => (
          <Select.Item key={statuses.label} value={statuses.value || 'All'}>
            {statuses.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
