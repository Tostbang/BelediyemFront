import { SidebarItem } from '@/types';
import {
    HomeIcon,
    BuildingIcon,
    ListIcon,
    LockIcon,
    SettingsIcon,
    UserIcon,
    MobileIcon,
    ModuleIcon,
    DateIcon,
    FlagIcon,
    SlideIcon,
    PeopleIcon,
} from '@/components/icons';

export const sidebarItemsAdmin: SidebarItem[] = [
    {
        title: 'Anasayfa',
        icon: <HomeIcon />,
        path: '/admin/dashboard',
    },
    {
        title: 'Belediye',
        icon: <BuildingIcon />,
        children: [
            {
                title: 'Belediye Listesi',
                icon: <ListIcon />,
                path: '/admin/municipality/list',
            },
            {
                title: 'Şifre Sıfırlma Talepleri',
                icon: <LockIcon />,
                path: '/admin/password-reset-requests',
            },
        ],
    },
    {
        title: 'SSS',
        icon: <HomeIcon />,
        path: '/admin/faq',
    },
    {
        title: 'Ayarlar',
        icon: <SettingsIcon />,
        children: [
            {
                title: 'Admin Bilgileri',
                icon: <UserIcon />,
                path: '/admin/profile',
            },
            {
                title: 'Şifre Değiştirme',
                icon: <LockIcon />,
                path: '/admin/change-password',
            },
            {
                title: 'Cihaz Oturumları',
                icon: <MobileIcon />,
                path: '/admin/sessions',
            },
        ],
    },
];

export const sidebarItemsMuni: SidebarItem[] = [
    {
        title: 'Anasayfa',
        icon: <HomeIcon />,
        path: '/municipality/dashboard',
    },
    {
        title: 'Modüle Yönetimi',
        icon: <ModuleIcon />,
        children: [
            {
                title: 'Etkinlik',
                icon: <DateIcon />,
                path: '/municipality/event',
            },
            {
                title: 'Slayt',
                icon: <SlideIcon />,
                path: '/municipality/slide',
            },
            {
                title: 'Mekan',
                icon: <FlagIcon />,
                path: '/municipality/place',
            },
            {
                title: 'Toplanma Alanı',
                icon: <PeopleIcon />,
                path: '/municipality/gathering-place',
            },
            {
                title: 'Tesis',
                icon: <BuildingIcon />,
                path: '/municipality/facility',
            },
        ],
    },
];

export const sidebarItemsStaff: SidebarItem[] = [
    {
        title: 'Anasayfa',
        icon: <HomeIcon />,
        path: '/staff/dashboard',
    },
    {
        title: 'Modüle Yönetimi',
        icon: <ModuleIcon />,
        children: [
            {
                title: 'Belediye Listesi',
                icon: <ListIcon />,
                path: '/admin/municipality/list',
            },
            {
                title: 'Şifre Sıfırlma Talepleri',
                icon: <LockIcon />,
            },
        ],
    },
];
