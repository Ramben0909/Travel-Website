import  { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'; // Import your CSS file for styling

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // Use Vite environment variable

const Map = () => {
  const mapContainer = useRef(null); // Ref for the map container
  const map = useRef(null); // Ref for the map instance
  const [lng, setLng] = useState(88.4682); // Default longitude
  const [lat, setLat] = useState(22.5842); // Default latitude
  const [zoom, setZoom] = useState(12);    // Default zoom

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLng = position.coords.longitude;
        const userLat = position.coords.latitude;

        setLng(userLng);
        setLat(userLat);

        // Initialize the map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style
          center: [userLng, userLat], // Set the map center to the user's location
          zoom: zoom, // Use the zoom state variable
        });

        // Add a marker at the user's location
        new mapboxgl.Marker()
          .setLngLat([userLng, userLat])
          .addTo(map.current);
      }, () => {
        alert('Unable to retrieve your location.');
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, [zoom]);

  // Update map view if lat, lng or zoom change
  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat]); // Update center when lng or lat changes
      map.current.setZoom(zoom); // Update zoom when it changes
    }
  }, [lng, lat, zoom]);

  // Functions to handle zooming
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 20)); // Zoom in
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 0)); // Zoom out
  };

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <div className="zoom-controls">
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
    </div>
  );
};

export default Map;
