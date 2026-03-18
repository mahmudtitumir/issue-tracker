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
      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
    </div>
  );
}
