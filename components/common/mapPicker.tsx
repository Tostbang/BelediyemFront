import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet';
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { extractLatFromMapUrl, extractLngFromMapUrl } from '@/utils';

interface Position {
    lat: number;
    lng: number;
}

interface MapPickerProps {
    value?: string;
    onChange?: (type: string, position: Position) => void;
    isReadOnly?: boolean;
}

interface MapEventsHandlerProps {
    handleMapClick: (event: { latlng: Position }) => void;
    isReadOnly?: boolean;
}

const MapPicker = ({
    value,
    onChange,
    isReadOnly = false,
}: MapPickerProps): React.ReactElement => {
    const lat = extractLatFromMapUrl(value || '');
    const lng = extractLngFromMapUrl(value || '');
    const defaultPosition = { lat: 39.9334, lng: 32.8597 };
    const [position, setPosition] = useState<Position>(
        lat && lng ? { lat, lng } : defaultPosition
    );

    const handleMapClick = (event: { latlng: Position }): void => {
        if (isReadOnly) return;

        const { lat, lng } = event.latlng;
        setPosition({ lat, lng });
        if (onChange) {
            onChange('map', { lat, lng });
        }
    };

    const MapEventsHandler = ({
        handleMapClick,
        isReadOnly,
    }: MapEventsHandlerProps): null => {
        useMapEvents({
            click: (e) => !isReadOnly && handleMapClick(e),
        });
        return null;
    };

    const customIcon = new L.Icon({
        iconUrl: '/assets/location.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
            dragging={true}
            zoomControl={true}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            attributionControl={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEventsHandler
                handleMapClick={handleMapClick}
                isReadOnly={isReadOnly}
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    {isReadOnly ? 'Konum' : 'Seçilen Konum'}:{' '}
                    {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapPicker;
