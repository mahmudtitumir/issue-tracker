'use client';
import { FaBug } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const Navbar = () => {
  const { status, data } = useSession();
  console.log(status, data);
  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];
  const currentPath = usePathname();
  return (
    <nav className="border-b mb-4 py-6 px-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="4">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-4">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link
                    className={`${
                      currentPath === link.href
                        ? 'text-zinc-700'
                        : 'text-zinc-500'
                    } hover:underline transition-colors`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href="/api/auth/signout">Logout</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href="/api/auth/signin">LogIn</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};
export default Navbar;
