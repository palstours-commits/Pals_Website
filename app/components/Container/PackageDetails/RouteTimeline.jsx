"use client";

import { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createCustomIcon = (color = "#2563eb") => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                  fill="${color}" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="9" r="3" fill="#ffffff"/>
        </svg>
    `;

    return new L.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
        shadowSize: [0, 0],
    });
};

const locations = [
    {
        name: "Chennai",
        position: [13.0827, 80.2707],
        description: "Capital of Tamil Nadu",
        color: "#2563eb"
    },
    {
        name: "Tirupati",
        position: [13.6288, 79.4192],
        description: "Spiritual Destination",
        color: "#7c3aed"
    },
    {
        name: "Vellore",
        position: [12.9165, 79.1325],
        description: "Fort City",
        color: "#dc2626"
    },
];

function MapControls({ onZoomIn, onZoomOut, onReset }) {
    return (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button
                onClick={onZoomIn}
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold w-10 h-10 rounded-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center text-xl"
                aria-label="Zoom In"
            >
                +
            </button>
            <button
                onClick={onZoomOut}
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold w-10 h-10 rounded-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center text-xl"
                aria-label="Zoom Out"
            >
                −
            </button>
            <button
                onClick={onReset}
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold w-10 h-10 rounded-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center text-sm"
                aria-label="Reset View"
            >
                ⟲
            </button>
        </div>
    );
}

function RouteInfo({ locations }) {
    const [distance, setDistance] = useState("85 km");
    const [duration, setDuration] = useState("2 hrs");

    useEffect(() => {
        if (locations.length < 2) return;

        const toRad = (deg) => (deg * Math.PI) / 180;
        const totalDist = locations.reduce((acc, curr, idx) => {
            if (idx === 0) return 0;
            const prev = locations[idx - 1];
            const R = 6371;
            const lat1 = toRad(prev.position[0]);
            const lat2 = toRad(curr.position[0]);
            const dLat = toRad(curr.position[0] - prev.position[0]);
            const dLon = toRad(curr.position[1] - prev.position[1]);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return acc + R * c;
        }, 0);

        setDistance(`${Math.round(totalDist)} km`);
        setDuration(`${Math.round(totalDist / 45)} hrs`);
    }, [locations]);

    return (
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200/50">
            <div className="flex items-center gap-6">
                <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Distance</p>
                    <p className="text-lg font-semibold text-gray-800">{distance}</p>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Duration</p>
                    <p className="text-lg font-semibold text-gray-800">{duration}</p>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Stops</p>
                    <p className="text-lg font-semibold text-gray-800">{locations.length}</p>
                </div>
            </div>
        </div>
    );
}

export default function RouteMap() {
    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);

    const handleMapReady = (e) => {
        mapRef.current = e.target;
        setMapReady(true);
        e.target.scrollWheelZoom.disable();
    };

    const enableScrollZoom = () => {
        mapRef.current?.scrollWheelZoom.enable();
    };

    const disableScrollZoom = () => {
        mapRef.current?.scrollWheelZoom.disable();
    };

    const handleZoomIn = () => {
        mapRef.current?.zoomIn();
    };

    const handleZoomOut = () => {
        mapRef.current?.zoomOut();
    };

    const handleReset = () => {
        if (mapRef.current) {
            mapRef.current.flyTo([13.0827, 80.2707], 9, {
                duration: 1.5,
            });
        }
    };

    return (
        <div className="w-full">
            <div className="relative isolate z-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div
                    className="relative isolate z-0 w-full h-[500px] overflow-hidden"
                    onMouseEnter={enableScrollZoom}
                    onMouseLeave={disableScrollZoom}
                >
                    <MapContainer
                        center={[13.0827, 80.2707]}
                        zoom={9}
                        style={{ width: "100%", height: "100%" }}
                        scrollWheelZoom={false}
                        dragging={true}
                        touchZoom={true}
                        doubleClickZoom={true}
                        boxZoom={true}
                        keyboard={true}
                        zoomControl={false}
                        attributionControl={false}
                        whenReady={handleMapReady}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />

                        {locations.map((location) => (
                            <Marker
                                key={location.name}
                                position={location.position}
                                icon={createCustomIcon(location.color)}
                            >
                                <Popup>
                                    <div className="text-center">
                                        <h3 className="font-bold text-gray-800">{location.name}</h3>
                                        <p className="text-sm text-gray-500">{location.description}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        <Polyline
                            positions={locations.map((item) => item.position)}
                            pathOptions={{
                                color: "#dc2626",
                                weight: 4,
                                opacity: 0.9,
                                lineCap: "round",
                                lineJoin: "round",
                                dashArray: null,
                            }}
                        />
                    </MapContainer>

                    {mapReady && (
                        <>
                            <MapControls
                                onZoomIn={handleZoomIn}
                                onZoomOut={handleZoomOut}
                                onReset={handleReset}
                            />
                            <RouteInfo locations={locations} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}