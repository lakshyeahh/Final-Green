import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function Map() {
    useEffect(() => {
        // Check if map container already exists
        if (!document.getElementById('map')) {
            // Create a map instance
            const map = L.map('map').setView([51.505, -0.09], 13);

            // Add the OpenStreetMap tile layer
           
        }
    }, []);

    return <div id="map" style={{ height: '400px' }}></div>;
}

export default Map;
