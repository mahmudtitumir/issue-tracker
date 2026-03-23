import type { Metadata } from 'next';
import Pagination from './components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  return (
    <div>
      <h1>Welcome to the Issue Tracker</h1>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'A simple issue tracking system built with Next.js',
};
