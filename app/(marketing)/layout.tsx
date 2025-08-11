import Link from 'next/dist/client/link';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export const metadata = {
  title: 'PocketSub - Marketing',
  description: 'Manage your subscriptions',
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='marketing-layout'>
      <nav className='bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='flex h-16 items-center justify-between'>
            <Link href='/' className='text-xl font-bold text-gray-800'>
              PocketSub
            </Link>

            <div className='flex items-center space-x-4'>
              {/* Tymczasowo wyłączone komponenty SignedIn/SignedOut */}
              <Link
                href='/dashboard'
                className='rounded-md px-3 py-2 text-gray-600 hover:text-gray-900'
              >
                Dashboard
              </Link>
              <SignedOut>
                <Link
                  href='/sign-in'
                  className='rounded-md px-3 py-2 text-gray-600 hover:text-gray-900'
                >
                  Sign in
                </Link>
                <Link
                  href='/sign-up'
                  className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                >
                  Sign up
                </Link>
                {/* <SignInButton />
                <SignUpButton>
                  <button className='h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base'>
                    Sign Up
                  </button>
                </SignUpButton> */}
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>{' '}
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
