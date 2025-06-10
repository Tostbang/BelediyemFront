import React, { ReactNode } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

export interface DropdownMenuItem {
    key: string;
    label: ReactNode;
    danger?: boolean;
    onClick?: () => void;
    show?: boolean;
}

interface DynamicDropdownProps {
    items: DropdownMenuItem[];
    icon?: ReactNode;
    className?: string;
}

const DynamicDropdown: React.FC<DynamicDropdownProps> = ({
    items,
    icon = <MoreOutlined />,
    className = 'text-2xl',
}) => {
    console.log("DynamicDropdown items:", items);
    const filteredItems = items.filter((item) => item.show !== false);

    const menuProps: MenuProps = {
        items: filteredItems,
    };

    return (
        <Dropdown menu={menuProps}>
            <a onClick={(e) => e.preventDefault()} className={className}>
                {icon}
            </a>
        </Dropdown>
    );
};

export default DynamicDropdown;
