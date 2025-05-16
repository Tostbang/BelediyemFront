import { AiFillHome } from 'react-icons/ai';
import { FaBlog, FaPoll } from 'react-icons/fa';
import React from 'react';
import { SidebarItem } from '@/types';

export const sidebarItemsAdmin: SidebarItem[] = [
    {
        path: '/admin/dashboard',
        icon: <AiFillHome />,
        title: 'Anasayfa',
    },
    {
        icon: <FaBlog />,
        title: 'Belediye',
        children: [
            {
                icon: <AiFillHome />,
                title: 'Belediye Listesi',
                path: '/admin/municipality/list',
            },
            {
                icon: <AiFillHome />,
                title: 'Şifre Sıfırlma Talepleri',
            },
        ],
    },
    {
        path: '/admin/faq',
        icon: <FaPoll />,
        title: 'SSS',
    },
    {
        icon: <FaBlog />,
        title: 'Ayarlar',
        children: [
            {
                icon: <AiFillHome />,
                title: 'Admin Bilgileri',
            },
            {
                icon: <AiFillHome />,
                title: 'Şifre Değiştirme',
            },
            {
                icon: <AiFillHome />,
                title: 'Cihaz Oturumları',
            },
        ],
    },
];
