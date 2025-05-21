'use client';

import React, { useState, useEffect } from 'react';
import type { GetProp, TableProps, TablePaginationConfig } from 'antd';
import { Form, Switch, Table, Button, Space, Tooltip, Skeleton } from 'antd';
import './table.css'; // We'll create this CSS file for custom styling

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DynamicTableProps<T extends object> {
    data: T[];
    columns: ColumnsType<T>;
    loading?: boolean;
    expandable?: ExpandableConfig<T>;
    footerContent?: () => React.ReactNode;
    rowSelection?: TableRowSelection<T>;
    showControls?: boolean;
    rowKey?: string | ((record: T) => string);
    tableProps?: Partial<TableProps<T>>;
    handleBulkAction?: () => void;
    selectedRowKeys?: React.Key[];
    setSelectedRowKeys?: (keys: React.Key[]) => void;
    pagination?: TablePaginationConfig;
}

export default function DynamicTable<T extends object>({
    data = [],
    columns,
    loading = false,
    tableProps = {},
    rowKey = 'id',
    expandable,
    footerContent = undefined,
    showControls = false, // Changed default to false to match the image
    // Selection props with defaults
    rowSelection,
    handleBulkAction = () => {},
    selectedRowKeys = [],
    setSelectedRowKeys = () => {},
    // Pagination props with defaults
    pagination = {},
}: DynamicTableProps<T>) {
    const [internalEllipsis, setInternalEllipsis] = useState(true);
    const [stylesLoaded, setStylesLoaded] = useState(false);

    // Handle initial style loading
    useEffect(() => {
        // Small timeout to ensure styles are applied after initial render
        const styleTimer = setTimeout(() => {
            setStylesLoaded(true);
        }, 100);

        return () => clearTimeout(styleTimer);
    }, []);

    const handleEllipsisChange = (enable: boolean) => {
        setInternalEllipsis(enable);
    };

    const tableColumns = (columns || []).map((item) => ({
        ...item,
        ellipsis: internalEllipsis,
    }));

    // Custom pagination configuration to match the UI in the image
    const paginationConfig: TablePaginationConfig = {
        pageSizeOptions: [5, 10, 20, 50, 100],
        showSizeChanger: false, // Hide size changer to match the image
        position: ['bottomCenter'], // Center alignment as shown in image
        size: 'default',
        // showTotal: false, // Remove the total text
        className: 'custom-pagination', // Apply custom styling
        itemRender: (page, type, originalElement) => {
            if (type === 'prev') {
                return <Button size="small">&lt;</Button>;
            }
            if (type === 'next') {
                return <Button size="small">&gt;</Button>;
            }
            if (type === 'page') {
                return (
                    <Button
                        size="small"
                        type={
                            pagination.current === page ? 'primary' : 'default'
                        }>
                        {page}
                    </Button>
                );
            }
            return originalElement;
        },
        ...(pagination || {}),
    };

    // Show skeleton loader when styles aren't ready or data is loading
    if (!stylesLoaded) {
        return (
            <div
                className="table-skeleton-container"
                style={{ minHeight: '400px' }}>
                <Skeleton active paragraph={{ rows: 10 }} />
            </div>
        );
    }

    return (
        <div className="custom-table-container" style={{ minHeight: '400px' }}>
            {selectedRowKeys.length > 0 && (
                <div className="mb-4">
                    <Space>
                        <Button type="primary" onClick={handleBulkAction}>
                            {selectedRowKeys.length} kayıt seçildi - İşlem Yap
                        </Button>
                        <Button onClick={() => setSelectedRowKeys([])}>
                            Seçimi Temizle
                        </Button>
                    </Space>
                </div>
            )}
            {showControls && (
                <Form
                    layout="inline"
                    className="table-demo-control-bar"
                    style={{ marginBottom: 16 }}>
                    <Tooltip title="Uzun metinleri daraltmak için">
                        <Form.Item label="Daraltma">
                            <Switch
                                checked={internalEllipsis}
                                onChange={handleEllipsisChange}
                            />
                        </Form.Item>
                    </Tooltip>
                </Form>
            )}
            <Table<T>
                {...tableProps}
                pagination={paginationConfig}
                columns={tableColumns}
                dataSource={data.length > 0 ? data : []}
                loading={loading}
                showHeader={true}
                footer={footerContent}
                expandable={expandable}
                rowSelection={rowSelection}
                scroll={{ x: 'max-content' }} // Modified to better fit content
                size="middle" // Changed to middle size for better spacing
                tableLayout="fixed"
                rowKey={rowKey}
                className="styled-table" // Add custom class for styling
            />
        </div>
    );
}

// its a example for using the dinamicTable component expand and selection props in further using
// const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

// // Row selection configuration
// const rowSelection = {
//     selectedRowKeys,
//     onChange: (selectedKeys: React.Key[]) => {
//         console.log('Selected row keys:', selectedKeys);
//         setSelectedRowKeys(selectedKeys);
//     },
// };

// // Button to handle selected rows
// const handleBulkAction = () => {
//     console.log(`Selected ${selectedRowKeys} items`);
// };

//<DinamicTable<T>
// rowSelection={rowSelection}
// handleBulkAction={handleBulkAction}
// selectedRowKeys={selectedRowKeys}
// setSelectedRowKeys={setSelectedRowKeys}
///>;
