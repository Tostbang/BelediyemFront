import type { Metadata } from 'next';

// Default metadata values
const defaultMetadata: Metadata = {
    title: {
        template: '%s | Belediyem',
        default: 'Belediyem',
    },
    description: 'Belediyem Admin Panel',
};

// Helper function to generate metadata with custom values
export function createMetadata(customMetadata: Partial<Metadata> = {}): Metadata {
    return {
        ...defaultMetadata,
        ...customMetadata,
    };
}

// Helper function for generating dynamic metadata
export async function generatePageMetadata(
    titlePrefix?: string,
    customDescription?: string
): Promise<Metadata> {
    return {
        ...defaultMetadata,
        title: titlePrefix ? `${titlePrefix} | ${defaultMetadata.title && typeof defaultMetadata.title === 'object' && 'default' in defaultMetadata.title ? defaultMetadata.title.default : defaultMetadata.title || ''}` : defaultMetadata.title,
        description: customDescription || defaultMetadata.description,
    };
}
