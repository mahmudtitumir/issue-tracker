import { Table } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';
import IssueAction from './IssueAction';

const IssueLoadingPage = () => {
  const issues = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <IssueAction />
      <Table.Root variant="surface" layout="auto">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueLoadingPage;
