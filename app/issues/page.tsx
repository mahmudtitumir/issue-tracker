import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/lib/prisma';
import { Container, Table } from '@radix-ui/themes';
import IssueAction from './IssueAction';
import { Status } from '../generated/prisma/enums';

const issuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: Status }>;
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes((await searchParams).status as Status)
    ? (await searchParams).status
    : undefined;
  const issues = await prisma.issue.findMany({ where: { status } });

  return (
    <Container>
      <IssueAction />
      <Table.Root variant="surface" layout="auto">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
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
