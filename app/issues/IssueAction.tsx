import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React, { Suspense } from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssueAction = () => {
  return (
    <Flex mb="4" justify="between" align="center">
      <Suspense fallback={<div className="h-9 w-40" />}>
        <IssueStatusFilter />
      </Suspense>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
