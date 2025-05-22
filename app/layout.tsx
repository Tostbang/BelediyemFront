import { Inter, Playfair_Display, Open_Sans } from 'next/font/google';
import './globals.css';
import 'nprogress/nprogress.css';
import NProgressProvider from '@/components/nproggress';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import AntdStable from '@/lib/antdPatch';
import LoginListener from '@/components/common/LoginListener';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
});
const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr" className={`${playfair.variable} ${openSans.variable}`}>
            <body className={inter.className}>
                <Suspense>
                    <NProgressProvider />
                    <AntdStable />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 1000,
                        }}
                    />
                    <LoginListener />
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
