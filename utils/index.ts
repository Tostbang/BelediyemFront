export const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};

//10/2/2025 > 10 Şubat 2025
export const formatDate = (date: string): string => {
    if (!date) return '';
    try {
        let newDate: Date;

        if (date.includes('/')) {
            const [day, month, year] = date.split('/').map(part => parseInt(part, 10));
            newDate = new Date(year, month - 1, day);
        } else {
            newDate = new Date(date);
        }

        if (isNaN(newDate.getTime())) {
            throw new Error('Invalid date');
        }

        const options = {
            year: "numeric" as const,
            month: "long" as const,
            day: "numeric" as const
        };

        return newDate.toLocaleDateString('tr-TR', options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return date;
    }
}

export const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('tr-TR', {
        month: 'short',
        year: 'numeric',
    });
};

//2025-05-22T12:22:41.9030262> 12.05.2025 - 10:22

export const formatDateTime = (date: string): string => {
    if (!date) return '';
    try {
        const newDate = new Date(date);
        if (isNaN(newDate.getTime())) {
            throw new Error('Invalid date');
        }

        const options = {
            year: "numeric" as const,
            month: "2-digit" as const,
            day: "2-digit" as const,
            hour: "2-digit" as const,
            minute: "2-digit" as const,
        };

        return newDate.toLocaleDateString('tr-TR', options).replace(',', ' -');
    } catch (error) {
        console.error('Error formatting date:', error);
        return date;
    }
}

export const formatDateInput = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
};


export const isPositiveNumber = (str: string) => {
    const num = Number(str);
    return !isNaN(num) && num > 0;
};

export const extractLatFromMapUrl = (mapUrl: string) => {
    const regex = /maps\?q=([-+]?\d*\.\d+),([-+]?\d*\.\d+)/;
    const match = mapUrl.match(regex);
    return match ? parseFloat(match[1]) : null;
};

export const extractLngFromMapUrl = (mapUrl: string) => {
    const regex = /maps\?q=([-+]?\d*\.\d+),([-+]?\d*\.\d+)/;
    const match = mapUrl.match(regex);
    return match ? parseFloat(match[2]) : null;
};