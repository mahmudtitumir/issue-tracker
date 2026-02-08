import { Box, Card, Flex } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="4" mb="2" mt="2" align="center">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose">
        <Skeleton count={4} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
