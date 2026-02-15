'use client';
import { FaBug } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const Navbar = () => {
  const { status, data } = useSession();
  console.log(status, data);
  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];
  const currentPath = usePathname();
  return (
    <nav className="flex items-center justify-between p-6">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-4">
        {navLinks.map(link => (
          <li key={link.label}>
            <Link
              className={`${
                currentPath === link.href ? 'text-zinc-700' : 'text-zinc-500'
              } hover:underline transition-colors`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">LogIn</Link>
        )}
      </Box>
    </nav>
  );
};
export default Navbar;
