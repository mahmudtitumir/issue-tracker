import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@/app/generated/prisma/client';
import { ChevronUpIcon } from '@radix-ui/react-icons';
import { Link, Table } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface issueQuery {
  status?: Status;
  orderBy?: keyof Issue;
  page: string;
}

interface Props {
  searchParams: issueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface" layout="auto">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell key={column.value}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {searchParams.orderBy === column.value && (
                <ChevronUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </Table.Cell>
            <Table.Cell>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status' },
  { label: 'Created', value: 'createdAt' },
];

export const columnsName = columns.map(column => column.value);

export default IssueTable;
