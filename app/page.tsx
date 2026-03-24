import { Container } from '@radix-ui/themes';
import type { Metadata } from 'next';

const Home = async () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Issue Tracker</h1>
      <p className="text-lg text-gray-600">
        This is a simple issue tracking system built with Next.js. You can
        create, view, and manage your issues easily.
      </p>
    </Container>
  );
};

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'A simple issue tracking system built with Next.js',
};
export default Home;
