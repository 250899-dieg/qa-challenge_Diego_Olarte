import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Skyline Skyways – Flight Search QA Harness',
  description: 'MVP flight search experience intentionally seeded with QA defects.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <Navbar />
        <main className="px-4 pb-16 pt-10 sm:px-8">{children}</main>
      </body>
    </html>
  );
}
