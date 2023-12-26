import '../styles/globals.css';
import type { Metadata } from 'next';
import siteMetadata from '@/constants/siteMetadata';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { NextThemeProvider } from './NextThemeProvider';

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <body className="bg-white text-black transition-colors dark:bg-black dark:text-white">
        <NextThemeProvider>
          <div className="mx-6 flex h-screen max-w-3xl flex-col antialiased md:mx-auto">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
        </NextThemeProvider>
      </body>
    </html>
  );
}
