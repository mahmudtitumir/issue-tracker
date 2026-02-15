'use client';
import { FaBug } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
    { label: 'Sign In', href: '/api/auth/signin' },
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
    </nav>
  );
};
export default Navbar;
