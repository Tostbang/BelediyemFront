import { ReactNode } from 'react';
import Image from 'next/image';

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Logo at the top-left */}
            <div className="absolute top-4 left-4 z-10">
                <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={150}
                    height={50}
                    priority
                />
            </div>

            {/* Background Image */}
            <Image
                className="dark:invert"
                src="/assets/bg.png"
                alt="Background Image"
                priority
                fill
            />

            <main className="flex-1 overflow-auto relative z-10">
                {children}
            </main>
        </div>
    );
}
