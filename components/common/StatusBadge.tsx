import React from 'react';

export default function StatusBadge({
    status,
}: {
    status: boolean | undefined;
}) {
    if (status === true) return <span className="text-green-500">Aktif</span>;
    if (status === false) return <span className="text-red-500">Pasif</span>;
    return <span className="text-gray-500">Bilinmiyor</span>;
}
