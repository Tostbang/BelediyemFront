import React, { RefObject } from 'react';
import Modal from '../common/modal';

interface DateFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFilter: () => void;
    onClear?: () => void; // New prop for clearing filters
    startDateRef: RefObject<HTMLInputElement>;
    endDateRef: RefObject<HTMLInputElement>;
    startDate?: string;
    endDate?: string;
}

const DateFiltersModal: React.FC<DateFilterModalProps> = ({
    isOpen,
    onClose,
    onFilter,
    onClear,
    startDateRef,
    endDateRef,
    startDate,
    endDate,
}) => {
    const handleClear = () => {
        if (onClear) {
            onClear();
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-lg font-semibold mb-4">Tarih Seç</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Başlangıç Tarihi
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            className="border border-gray-300 rounded p-2 w-full"
                            defaultValue={startDate || ''}
                            ref={startDateRef}
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bitiş Tarihi
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            className="border border-gray-300 rounded p-2 w-full"
                            defaultValue={endDate || ''}
                            ref={endDateRef}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onFilter}
                        className="flex-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                        Seç
                    </button>

                    {onClear && (
                        <button
                            onClick={handleClear}
                            className="flex-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200">
                            Temizle
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default DateFiltersModal;
