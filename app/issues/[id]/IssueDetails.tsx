import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@/app/generated/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" mb="2" mt="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
