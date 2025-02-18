// import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut, signIn } from '@/auth';

const Navbar = async() => {
  const session = await auth();

  return (
    <header className='px-4 py-2 bg-white shadow-sm font-work-sans'>
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.jpg" alt="logo" width={80} height={20} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (

            <>
              <Link href="/startup/create">
                <span className="text-gray-500">Create</span>
              </Link>

              <form action={async() => {
                "use server"

                await signOut();

              }}>

                <button type="submit">
                  <span className="text-gray-500">Sign Out</span>
                </button>
              </form>

              <Link href={`/user/${session.user.id}`}>
                  <span className='text-black'>{session?.user?.name}</span>
              </Link>

            </>
          ) : (
            <form action={async() => {
              "use server";

              await signIn('github');
            }}>
              <button className="text-gray-500" type='submit'>Sign In</button>
            </form>

          )}
        </div>
      </nav>
    </header>
  );
};


export default Navbar;

// import Image from 'next/image';
// import Link from 'next/link';
// import { auth } from '@/auth';
// import NavbarClient from './NavbarClient';

// const Navbar = async () => {
//   const session = await auth();

//   return (
//     <header className='px-4 py-1 bg-white shadow-md'>
//       <nav className="flex justify-between items-center max-w-7xl mx-auto">
//         <Link href="/">
//           <Image src="/logo.jpg" alt="logo" width={80} height={10} className="cursor-pointer" />
//         </Link>
//         <NavbarClient session={session} />
//       </nav>
//     </header>
//   );
// };

// export default Navbar;