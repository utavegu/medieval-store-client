import MobxProvider from '@/store/context';
// import './globals.css';
import '../styles/index.css';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <MobxProvider>{children}</MobxProvider>
      </body>
    </html>
  );
}
