import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import NavbarClient from './NavbarClient';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.jpg" alt="logo" width={144} height={30} />
        </Link>
        <NavbarClient session={session} />
      </nav>
    </header>
  );
};

export default Navbar;