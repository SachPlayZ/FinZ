
'use client';

import AuthNavbar from './AuthNavbar';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

export default function ClientNavbar() {
  const pathname = usePathname();
  if (pathname === '/account' || pathname === '/dashboard' || pathname === 'analytics') {
    return null;
  }
  return <Navbar />;
}
