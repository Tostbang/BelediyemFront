import { SidebarItem } from '@/types';

export const sidebarItemsAdmin: SidebarItem[] = [
    {
        path: '/admin/dashboard',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
        ),
        title: 'Anasayfa',
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
        ),
        title: 'Belediye',
        children: [
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                ),

                title: 'Belediye Listesi',
                path: '/admin/municipality/list',
            },
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                ),

                title: 'Şifre Sıfırlma Talepleri',
            },
        ],
    },
    {
        path: '/admin/faq',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
        ),
        title: 'SSS',
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
        ),

        title: 'Ayarlar',
        children: [
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                ),

                title: 'Admin Bilgileri',
            },
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                ),

                title: 'Şifre Değiştirme',
            },
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 10.1818V20.1818C3 20.1818 3 22 4.8 22C6.6 22 19.2 22 19.2 22C19.2 22 21 22 21 20.1818C21 18.3636 21 10.1818 21 10.1818L12 2L3 10.1818Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                ),

                title: 'Cihaz Oturumları',
            },
        ],
    },
];
