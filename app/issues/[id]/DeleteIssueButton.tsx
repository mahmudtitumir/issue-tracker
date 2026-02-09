'use client';
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleDeleteIssue = async () => {
    try {
      setSubmitting(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues');
      router.refresh();
    } catch {
      setSubmitting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={submitting}>
            Delete Issue {submitting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure about this issue!</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure? This issue will no longer be accessible.
          </AlertDialog.Description>
          <Flex className="mt-2" gap="2">
            <AlertDialog.Cancel>
              <Button variant="soft">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDeleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            At the moment, the issue cannot delete.
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Flex className="mt-2">
              <Button variant="soft" onClick={() => setError(false)}>
                Ok
              </Button>
            </Flex>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
