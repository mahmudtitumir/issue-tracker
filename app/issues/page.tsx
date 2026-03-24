import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { Container } from '@radix-ui/themes';
import Pagination from '../components/Pagination';
import { Issue } from '../generated/prisma/client';
import { Status } from '../generated/prisma/enums';
import IssueTable, { columnsName, issueQuery } from './[id]/IssueTable';
import IssueAction from './IssueAction';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<issueQuery>;
}

const issuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status as Status)
    ? resolvedSearchParams.status
    : undefined;
  const where = { status };
  const orderBy = columnsName.includes(
    resolvedSearchParams.orderBy as keyof Issue,
  )
    ? { [resolvedSearchParams.orderBy!]: 'asc' }
    : undefined;

  const page = parseInt(resolvedSearchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Container>
      <IssueAction />
      <IssueTable searchParams={resolvedSearchParams} issues={issues} />
      <Suspense fallback={null}>
        <Pagination
          itemCount={issueCount}
          currentPage={page}
          pageSize={pageSize}
        />
      </Suspense>
    </Container>
  );
};

export const metadata: Metadata = {
  title: 'Issue - List',
  description: 'List of all issues in the system',
};

export default issuesPage;
