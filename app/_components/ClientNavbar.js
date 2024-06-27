
'use client';

import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

export default function ClientNavbar() {
  const pathname = usePathname();
  if (pathname === '/account') {
    return null;
  }
  return <Navbar />;
}
