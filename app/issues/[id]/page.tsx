import prisma from '@/lib/prisma';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap="3">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) return {};
  return {
    title: `Issue - ${issue.id}`,
    description: issue.description,
  };
}

export default IssueDetailPage;
