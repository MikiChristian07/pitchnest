"use client";

import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

import { Session } from 'next-auth';

const NavbarClient = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex items-center gap-5">
      {session && session.user ? (
        <>
          <Link href="/startup/create">
            <span className="text-gray-500">Create</span>
          </Link>

          <button onClick={() => signOut()}>
            <span className="text-gray-500">Sign Out</span>
          </button>

          <Link href={`/user/${session?.id}`}>
            <span>{session.user.name}</span>
          </Link>
        </>
      ) : (
        <button onClick={() => signIn('github')}>
          <span className="text-gray-500">Sign In</span>
        </button>
      )}
    </div>
  );
};

export default NavbarClient;