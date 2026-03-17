'use client';

import { Select } from '@radix-ui/themes';
import React from 'react';
import { Status } from '../generated/prisma/enums';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

function IssueStatusFilter() {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status: string) => {
        const query = status === 'All' ? '' : `?status=${status}`;
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
