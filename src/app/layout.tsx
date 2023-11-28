import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '../../config/site';

const inter = Inter({ subsets: ['latin'] });

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
  display: 'swap',
  variable: '--font-heading',
  fallback: ['sans-serif'],
});

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn(headingFont.variable, textFont.variable)}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
