'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Stats', href: '/stats' },
  { name: 'Articles', href: '/articles' }, // homepage currently lists articles
  // Add Tools later
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex space-x-6">
      {navItems.map((item) => (
        <Link
          key={`${item.name}-${item.href}`}
          href={item.href}
          className={`hover:underline ${
            pathname === item.href ? 'font-bold underline' : ''
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
