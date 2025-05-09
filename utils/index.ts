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

export const isPositiveNumber = (str: string) => {
    const num = Number(str);
    return !isNaN(num) && num > 0;
};