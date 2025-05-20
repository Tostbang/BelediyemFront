import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { motion } from 'framer-motion';

interface TabItem {
    key: string;
    label: string;
    children: ReactNode;
}

interface DynamicTabsProps {
    defaultActiveKey?: string;
    items: TabItem[];
    onChange?: (key: string) => void;
}

export default function DynamicTabs({
    defaultActiveKey = '1',
    items = [],
    onChange,
}: DynamicTabsProps) {
    const [selectedIndex, setSelectedIndex] = useState(() => {
        const index = items.findIndex((item) => item.key === defaultActiveKey);
        return index >= 0 ? index : 0;
    });

    useEffect(() => {
        const index = items.findIndex((item) => item.key === defaultActiveKey);
        setSelectedIndex(index >= 0 ? index : 0);
    }, [defaultActiveKey, items]);

    const handleChange = useCallback(
        (index: number) => {
            setSelectedIndex(index);
            if (onChange && items[index]) {
                onChange(items[index].key);
            }
        },
        [onChange, items]
    );

    return (
        <TabGroup selectedIndex={selectedIndex} onChange={handleChange}>
            <TabList className="relative flex border-gray-300">
                {items.map((item, index) => (
                    <Tab
                        key={index}
                        className="relative px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none">
                        {({ selected }) => (
                            <span
                                className={`text-sm font-medium ${selected ? 'text-blue-600' : 'text-gray-500'}`}>
                                {item.label}
                                {selected && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </span>
                        )}
                    </Tab>
                ))}
            </TabList>

            <TabPanels className="mt-3">
                <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    {items.map((item, index) => (
                        <TabPanel
                            key={item.key}
                            hidden={selectedIndex !== index}
                            className="rounded-xl bg-gray-50 p-3 focus:outline-none">
                            {item.children}
                        </TabPanel>
                    ))}
                </motion.div>
            </TabPanels>
        </TabGroup>
    );
}
