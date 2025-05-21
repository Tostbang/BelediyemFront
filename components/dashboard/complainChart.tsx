'use client';

import React from 'react';
import { Bar } from '@ant-design/plots';
import { formatMonth } from '@/utils';

// Define the props for monthly statistics
export interface MonthlyStatistic {
    month: string;
    totalComplaints: number;
    resolvedCount: number;
    pendingCount: number;
    underReviewCount: number;
    startedCount: number;
    rejectedCount: number;
}

export default function ComplaintChart({
    monthlyStatistics,
}: {
    monthlyStatistics: MonthlyStatistic[];
}) {
    // Transform monthly data for the chart
    const prepareChartData = () => {
        if (!monthlyStatistics || monthlyStatistics.length === 0) {
            return [];
        }

        const chartData: unknown[] = [];

        monthlyStatistics.forEach((stat) => {
            // Add total complaints
            chartData.push({
                month: formatMonth(stat.month),
                type: 'Toplam Şikayet',
                count: stat.totalComplaints,
            });

            // Add resolved complaints
            chartData.push({
                month: formatMonth(stat.month),
                type: 'Çözüldü',
                count: stat.resolvedCount,
            });

            // Add pending complaints
            chartData.push({
                month: formatMonth(stat.month),
                type: 'Bekliyor',
                count: stat.pendingCount,
            });

            // Add under review complaints
            chartData.push({
                month: formatMonth(stat.month),
                type: 'İnceleniyor',
                count: stat.underReviewCount,
            });

            // Add started complaints
            chartData.push({
                month: formatMonth(stat.month),
                type: 'Başladı',
                count: stat.startedCount,
            });

            // Add rejected complaints
            chartData.push({
                month: formatMonth(stat.month),
                type: 'Reddedildi',
                count: stat.rejectedCount,
            });
        });

        return chartData;
    };

    const config = {
        data: prepareChartData(),
        xField: 'month',
        yField: 'count',
        colorField: 'type',
        stack: true,
        scale: {
            color: {
                range: [
                    '#3b82f6',
                    '#22c55e',
                    '#f97316',
                    '#eab308',
                    '#f59e0b',
                    '#ef4444',
                ],
            },
        },
        axis: {
            y: { labelFormatter: '~s' },
            x: {
                labelSpacing: 10,
            },
        },
        label: {
            position: 'inside',
            style: {
                fill: '#fff',
            },
        },
    };

    return (
        <div className="w-full overflow-hidden mt-6 bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
                Şikayet Dağılımı (Son 12 ay)
            </h2>
            {monthlyStatistics && monthlyStatistics.length > 0 ? (
                <div className="border p-2 sm:p-3 rounded">
                    <h4 className="text-md font-medium mb-2">
                        Aylık Şikayet İstatistikleri
                    </h4>
                    <div
                        style={{
                            height: '350px',
                            width: '100%',
                            overflowX: 'auto',
                        }}>
                        <Bar {...config} />
                    </div>
                </div>
            ) : (
                <div className="border p-2 sm:p-3 rounded">
                    <h4 className="text-md font-medium mb-2">
                        İstatistikler mevcut değil.
                    </h4>
                </div>
            )}
        </div>
    );
}
