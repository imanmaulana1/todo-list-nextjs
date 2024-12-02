import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/providers/providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Todo List',
  description:
    'Stay organized with our intuitive Todo List web application. Easily manage tasks, track progress, and boost productivity. Perfect for personal use. Get started!',
  icons: {
    icon: '/task.png',
  },
  openGraph: {
    title: 'Todo List',
    type: 'website',
    siteName: 'Todo List',
    description:
      'Stay organized with our intuitive Todo List web application. Easily manage tasks, track progress, and boost productivity. Perfect for personal use. Get started!',
    url: process.env.NEXT_PUBLIC_BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo List',
    description:
      'Stay organized with our intuitive Todo List web application. Easily manage tasks, track progress, and boost productivity. Perfect for personal use. Get started!',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Providers>
          <div className='container max-w-screen-xl mx-auto py-4 px-4 md:px-8 lg:px-20'>
            <ToastContainer closeOnClick={true} draggable={true} stacked />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
