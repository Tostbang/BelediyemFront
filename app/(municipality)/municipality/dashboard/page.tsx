import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDashboardMuni } from '@/app/actions';
import StatsCard from '@/components/common/statatsCard';
import {
    ClipboardIcon,
    ClockIcon,
    EyeIcon,
    PauseIcon,
    TickIcon,
    XIcon,
} from '@/components/icons';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page() {
    const dashboard = await getDashboardMuni();

    const breadcrumb = [{ label: 'Anasayfa' }];

    // Sample data based on the image (replace with actual data from dashboard object)
    const cardsData = [
        {
            title: 'Gelen Şikayet/Talep',
            value: dashboard?.totalComplaints || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <ClipboardIcon />
                </div>
            ),
        },
        {
            title: 'Çözülen Sorunlar',
            value: dashboard?.resolvedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <TickIcon />
                </div>
            ),
        },
        {
            title: 'Bekleyen Sorunlar',
            value: dashboard?.pendingCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    <ClockIcon />
                </div>
            ),
        },
        {
            title: 'İncelenen Şikayet/Talepler',
            value: dashboard?.underReviewCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                    <EyeIcon />
                </div>
            ),
        },
        {
            title: 'Başlayan Şikayet/Talepler',
            value: dashboard?.startedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                    <PauseIcon />
                </div>
            ),
        },
        {
            title: 'Reddedilen Şikayet/Talepler',
            value: dashboard?.rejectedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <XIcon />
                </div>
            ),
        },
    ];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            <h1 className="text-2xl font-bold mb-4 sm:mb-6">Dashboard</h1>
            {/* Top Cards - Improved layout for proper centering */}
            <div className="flex flex-col items-center w-full mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
                    {cardsData.map((card, index) => (
                        <StatsCard
                            key={index}
                            title={card.title}
                            value={card.value}
                            icon={card.icon}
                        />
                    ))}
                </div>
            </div>

            {/* Department Table - Improved for mobile */}
            {/* <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-6 w-full overflow-hidden">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">
                    Departman Bazlı Dağılım
                </h2>
                <div className="overflow-x-auto -mx-3 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left texts-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ay
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Toplam Şikayet
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Çözüldü
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bekleniyor
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        İnceleniyor
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Başlatıldı
                                    </th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reddedildi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200"></tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 italic block sm:hidden text-center">
                    Tüm verileri görmek için sağa kaydırınız
                </div>
            </div> */}
        </PageContainer>
    );
}
