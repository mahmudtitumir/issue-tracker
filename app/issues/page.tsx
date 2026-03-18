import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link';
import prisma from '@/lib/prisma';
import { Container, Table } from '@radix-ui/themes';
import IssueAction from './IssueAction';
import { Status } from '../generated/prisma/enums';
import { Issue } from '../generated/prisma/client';

interface Props {
  searchParams: Promise<{ status?: Status; orderBy?: keyof Issue }>;
}

const issuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const columns: { label: string; value: keyof Issue }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Created', value: 'createdAt' },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status as Status)
    ? resolvedSearchParams.status
    : undefined;
  const orderBy = columns
    .map(column => column.value)
    .includes(resolvedSearchParams.orderBy as keyof Issue)
    ? { [resolvedSearchParams.orderBy!]: 'asc' }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <Container>
      <IssueAction />
      <Table.Root variant="surface" layout="auto">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { ...resolvedSearchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {resolvedSearchParams.orderBy === column.value && ' 🔽'}
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
    </Container>
  );
};

export default issuesPage;
