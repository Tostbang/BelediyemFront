import LoginForm from '@/components/login/form';
import { generatePageMetadata } from '@/lib/metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Personel Giriş');
}

export default function AdminLogin() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="z-10 flex flex-col md:flex-row gap-8 items-center justify-center w-full mt-8 md:mt-0">
                    <LoginForm type="staff" />
                </div>
            </main>
        </div>
    );
}
