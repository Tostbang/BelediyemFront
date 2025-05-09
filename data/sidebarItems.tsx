import { AiFillHome } from 'react-icons/ai';
import {
    FaBlog,
    FaPoll,
    // FaSlidersH,
    FaComment,
    FaCog,
    FaSignOutAlt,
    FaMapMarkerAlt,
    FaHandsHelping,
    FaPalette,
    FaEye,
    FaQuoteRight,
} from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoShareSocial } from 'react-icons/io5';
import React from 'react';

export type SidebarItem = {
    path: string;
    icon: React.ReactNode;
    title: string;
    isLogout?: boolean;
};

export const sidebarItems: SidebarItem[] = [
    {
        path: '/admin/dashboard',
        icon: <AiFillHome />,
        title: 'Anasayfa',
    },
    {
        path: '/admin/blog',
        icon: <FaBlog />,
        title: 'Blog',
    },
    {
        path: '/admin/survey',
        icon: <FaPoll />,
        title: 'Anket',
    },
    // {
    //     path: '/admin/slider',
    //     icon: <FaSlidersH />,
    //     title: 'Slayt',
    // },
    {
        path: '/admin/visit',
        icon: <FaMapMarkerAlt />,
        title: 'Ziyaret',
    },
    {
        path: '/admin/charity',
        icon: <FaHandsHelping />,
        title: 'Dayanışma',
    },
    {
        path: '/admin/vision',
        icon: <FaEye />,
        title: 'Misyon & Vizyon',
    },
    {
        path: '/admin/testimonial',
        icon: <FaQuoteRight />,
        title: 'Sizden Gelenler',
    },
    {
        path: '/admin/category',
        icon: <BiCategoryAlt />,
        title: 'Kategori',
    },
    {
        path: '/admin/support',
        icon: <FaComment />,
        title: 'Yardım Merkezi',
    },
    {
        path: '/admin/system',
        icon: <FaCog />,
        title: 'Sistem',
    },
    {
        path: '/admin/social',
        icon: <IoShareSocial />,
        title: 'Sosyal Medya',
    },
    {
        path: '/admin/colors',
        icon: <FaPalette />,
        title: 'Tema Renk Ayarları',
    },
    {
        path: '',
        icon: <FaSignOutAlt />,
        title: 'Çıkış Yap',
        isLogout: true,
    },
];
