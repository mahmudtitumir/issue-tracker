import React from 'react';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import prisma from '@/lib/prisma';

const Dashboard = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  return <IssueSummary open={open} inProgress={inProgress} closed={closed} />;
};

export default Dashboard;
