import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import IssueFormDate from '../../_components/IssueForm';

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();
  return <IssueFormDate issue={issue} />;
};

export default IssueEditPage;
