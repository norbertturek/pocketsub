import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PocketSub',
  description: 'Manage your subscriptions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' className='h-full bg-gray-50'>
        <body className={`${inter.className} flex h-full flex-col`}>
          {/* <Navbar /> */}

          <main className='flex-1'>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
