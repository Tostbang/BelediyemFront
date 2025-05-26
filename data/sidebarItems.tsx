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
    ChatIcon,
    StarIcon,
    SupportIcon,
    MoneyIcon,
    HornIcon,
    EnvelopeIcon,
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
                path: '/admin/municipality/password-reset-requests',
            },
        ],
    },
    {
        title: 'SSS',
        icon: <ListIcon />,
        path: '/admin/faq',
    },
    {
        title: 'Sözleşmeler',
        icon: <ListIcon />,
        path: '/admin/contract/list',
    },
    {
        title: 'Ayarlar',
        icon: <SettingsIcon />,
        children: [
            {
                title: 'Admin Bilgileri',
                icon: <UserIcon />,
                path: '/admin/settings/profile',
            },
            {
                title: 'Şifre Değiştirme',
                icon: <LockIcon />,
                path: '/admin/settings/change-password',
            },
            {
                title: 'Cihaz Oturumları',
                icon: <MobileIcon />,
                path: '/admin/settings/sessions',
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
    {
        title: 'Şikayet Talebi',
        icon: <EnvelopeIcon />,
        path: '/municipality/complaint-request',
    },
    {
        title: 'Ödeme',
        icon: <MoneyIcon />,
        path: '/municipality/payment',
    },
    {
        title: 'Sohbet',
        icon: <ChatIcon />,
        path: '/municipality/chat',
    },
    {
        title: 'Personel',
        icon: <PeopleIcon />,
        path: '/municipality/staff',
    },
    {
        title: 'Vatandaş',
        icon: <PeopleIcon />,
        path: '/municipality/citizen',
    },
    {
        title: 'Değerlendirme',
        icon: <StarIcon />,
        path: '/municipality/ratings',
    },
    {
        title: 'Destek',
        icon: <SupportIcon />,
        path: '/municipality/support',
    },
    {
        title: 'SSS',
        icon: <HornIcon />,
        path: '/municipality/faq',
    },
    {
        title: 'Ayarlar',
        icon: <SettingsIcon />,
        children: [
            {
                title: 'Belediye Bilgileri',
                icon: <UserIcon />,
                path: '/municipality/settings/profile',
            },
            {
                title: 'Şifre Değiştirme',
                icon: <LockIcon />,
                path: '/municipality/settings/change-password',
            },
            {
                title: 'Cihaz Oturumları',
                icon: <MobileIcon />,
                path: '/municipality/settings/sessions',
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
        title: 'Şikayet Talebi',
        icon: <EnvelopeIcon />,
        path: '/staff/complaint-request',
    },
    {
        title: 'Sohbet',
        icon: <ChatIcon />,
        path: '/staff/chat',
    },
    {
        title: 'SSS',
        icon: <HornIcon />,
        path: '/staff/faq',
    },
    {
        title: 'Ayarlar',
        icon: <SettingsIcon />,
        children: [
            {
                title: 'Personel Bilgileri',
                icon: <UserIcon />,
                path: '/staff/settings/profile',
            },
            {
                title: 'Şifre Değiştirme',
                icon: <LockIcon />,
                path: '/staff/settings/change-password',
            },
            {
                title: 'Cihaz Oturumları',
                icon: <MobileIcon />,
                path: '/staff/settings/sessions',
            },
        ],
    },
];
