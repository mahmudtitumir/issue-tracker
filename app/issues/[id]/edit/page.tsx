import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
