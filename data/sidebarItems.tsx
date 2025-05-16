import { SidebarItem } from '@/types';
import {
    HomeIcon,
    BuildingIcon,
    ListIcon,
    LockIcon,
    SettingsIcon,
    UserIcon,
    MobileIcon,
} from '@/components/icons';

export const sidebarItemsAdmin: SidebarItem[] = [
    {
        path: '/admin/dashboard',
        icon: <HomeIcon />,
        title: 'Anasayfa',
    },
    {
        icon: <BuildingIcon />,
        title: 'Belediye',
        children: [
            {
                icon: <ListIcon />,
                title: 'Belediye Listesi',
                path: '/admin/municipality/list',
            },
            {
                icon: <LockIcon />,
                title: 'Şifre Sıfırlma Talepleri',
            },
        ],
    },
    {
        path: '/admin/faq',
        icon: <HomeIcon />,
        title: 'SSS',
    },
    {
        icon: <SettingsIcon />,
        title: 'Ayarlar',
        children: [
            {
                icon: <UserIcon />,
                title: 'Admin Bilgileri',
            },
            {
                icon: <LockIcon />,
                title: 'Şifre Değiştirme',
            },
            {
                icon: <MobileIcon />,
                title: 'Cihaz Oturumları',
            },
        ],
    },
];
