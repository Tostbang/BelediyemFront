'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Modal from '../common/modal';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Dynamically import the map picker to avoid SSR issues
const LocationPicker = dynamic(() => import('../common/mapPicker'), {
    ssr: false,
});

interface MapModalProps {
    initialLatitude?: string;
    initialLongitude?: string;
}

export default function MapModal({
    initialLatitude = '',
    initialLongitude = '',
}: MapModalProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentCoordinates, setCurrentCoordinates] = React.useState({
        latitude: initialLatitude,
        longitude: initialLongitude,
    });

    // Update component state when props change (for initial values)
    React.useEffect(() => {
        setCurrentCoordinates({
            latitude: initialLatitude,
            longitude: initialLongitude,
        });
    }, [initialLatitude, initialLongitude]);

    const handleMapChange = (
        _name: string,
        value: {
            lat: number;
            lng: number;
        }
    ) => {
        const newLatitude = value.lat.toString();
        const newLongitude = value.lng.toString();

        // Update internal state
        setCurrentCoordinates({
            latitude: newLatitude,
            longitude: newLongitude,
        });

        // Update hidden input values using DOM manipulation
        const latitudeInput = document.getElementById(
            'latitude'
        ) as HTMLInputElement;
        const longitudeInput = document.getElementById(
            'longitude'
        ) as HTMLInputElement;

        if (latitudeInput && longitudeInput) {
            latitudeInput.value = newLatitude;
            longitudeInput.value = newLongitude;
        }
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const hasCoordinates =
        currentCoordinates.latitude && currentCoordinates.longitude;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Konum
                    </label>
                    <div className="text-sm text-gray-500">
                        {hasCoordinates
                            ? `Seçilen konum: ${currentCoordinates.latitude}, ${currentCoordinates.longitude}`
                            : 'Henüz konum seçilmedi'}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FaMapMarkerAlt className="mr-2" />
                    {hasCoordinates ? 'Konumu Değiştir' : 'Konum Seç'}
                </button>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Konum Seç
                    </h3>
                    <div className="h-[400px]">
                        <LocationPicker
                            value={`https://www.google.com/maps?q=${
                                currentCoordinates.latitude || 0
                            },${currentCoordinates.longitude || 0}`}
                            onChange={handleMapChange}
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer">
                            Kapat
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                            Onayla
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
