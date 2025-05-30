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
    onChange: (type: string, position: Position) => void;
}

interface MapEventsHandlerProps {
    handleMapClick: (event: { latlng: Position }) => void;
}

const MapPicker = ({ value, onChange }: MapPickerProps): React.ReactElement => {
    const lat = extractLatFromMapUrl(value || '');
    const lng = extractLngFromMapUrl(value || '');
    const defaultPosition = { lat: 39.9334, lng: 32.8597 };
    const [position, setPosition] = useState<Position>(
        lat && lng ? { lat, lng } : defaultPosition
    );

    const handleMapClick = (event: { latlng: Position }): void => {
        const { lat, lng } = event.latlng;
        setPosition({ lat, lng });
        onChange('map', { lat, lng });
    };

    const MapEventsHandler = ({
        handleMapClick,
    }: MapEventsHandlerProps): null => {
        useMapEvents({
            click: (e) => handleMapClick(e),
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
            style={{ width: '100%', height: '400px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEventsHandler handleMapClick={handleMapClick} />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Selected Location: {position.lat}, {position.lng}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapPicker;
