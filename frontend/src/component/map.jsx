import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import axios from "axios";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(87.1413); // Default longitude
  const [lat, setLat] = useState(23.10166); // Default latitude
  const [zoom, setZoom] = useState(12); // Default zoom
  const [places, setPlaces] = useState([]); // State for nearby places
  const [hotels, setHotels] = useState([]);
  const [newPlace, setNewPlace] = useState(null); // State for new marker coordinates
  const markerRef = useRef(null); // Ref for the user's marker
  const placeMarkersRef = useRef([]); // Ref for all place markers
  const hotelMarkersRef = useRef([]); // Ref for all hotel markers

  const getBoundingBox = (latitude, longitude, radius) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = radius / R; // Angular distance in radians
    const dLon = radius / (R * Math.cos((Math.PI * latitude) / 180)); // Angular distance in radians

    const minLat = latitude - (dLat * 180) / Math.PI;
    const maxLat = latitude + (dLat * 180) / Math.PI;
    const minLon = longitude - (dLon * 180) / Math.PI;
    const maxLon = longitude + (dLon * 180) / Math.PI;

    return { minLat, maxLat, minLon, maxLon };
  };

  const fetchTouristPlaceDetails = async (latitude, longitude) => {
    const apiKey = "235a929292f84ed0a5587d7ea5eab757";
    const radius = 150; // 150 km
    const { minLat, maxLat, minLon, maxLon } = getBoundingBox(latitude, longitude, radius);

    const apiUrl = `https://api.geoapify.com/v2/places?categories=tourism&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=100&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const placesData = response.data.features.map((feature) => {
        const coordinates = feature.geometry.coordinates;
        return {
          name: feature.properties.name,
          lat: coordinates[1],
          lng: coordinates[0],
        };
      });
      setPlaces(placesData);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const fetchHotelPlaces = async (latitude, longitude) => {
    const apiKey = "235a929292f84ed0a5587d7ea5eab757";
    const radius = 6000; // 6 km

    const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},${radius}&bias=proximity:${longitude},${latitude}&limit=20&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);

      if (response.data && response.data.features) {
        const hotelData = response.data.features.map((feature) => {
          const coordinates = feature.geometry.coordinates;
          return {
            name: feature.properties.name || "Unnamed Hotel",
            lat: coordinates[1],
            lng: coordinates[0],
          };
        });
        setHotels(hotelData);
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error.response?.data || error.message);
    }
  };

  const initializeMap = (longitude, latitude) => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: zoom,
    });

    const userMarker = new mapboxgl.Marker({ color: "tomato" })
      .setLngLat([longitude, latitude])
      .addTo(map.current);
    markerRef.current = userMarker;

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserLocation: true,
    });
    map.current.addControl(geolocateControl);

    map.current.on("dblclick", (e) => {
      const { lng, lat } = e.lngLat;
      setNewPlace({ lng, lat });

      if (markerRef.current) {
        markerRef.current.remove();
      }

      const marker = new mapboxgl.Marker({ color: "tomato" })
        .setLngLat([lng, lat])
        .addTo(map.current);
      markerRef.current = marker;

      map.current.flyTo({
        center: [lng, lat],
        essential: true,
      });

      // Clear previous markers
      placeMarkersRef.current.forEach((marker) => marker.remove());
      placeMarkersRef.current = [];
      hotelMarkersRef.current.forEach((marker) => marker.remove());
      hotelMarkersRef.current = [];

      setPlaces([]);
      setHotels([]);

      fetchTouristPlaceDetails(lat, lng);
      fetchHotelPlaces(lat, lng);
    });
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLng = position.coords.longitude;
            const userLat = position.coords.latitude;
            setLng(userLng);
            setLat(userLat);
            initializeMap(userLng, userLat);
            fetchTouristPlaceDetails(userLat, userLng);
            fetchHotelPlaces(userLat, userLng);
          },
          (error) => {
            console.error("Geolocation error:", error);
            alert("Unable to retrieve your location. Showing default location.");
            initializeMap(lng, lat);
            fetchTouristPlaceDetails(lat, lng);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
        initializeMap(lng, lat);
        fetchTouristPlaceDetails(lat, lng);
      }
    };

    getCurrentLocation();
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (map.current && places.length > 0) {
      // Clear existing place markers
      placeMarkersRef.current.forEach((marker) => marker.remove());
      placeMarkersRef.current = [];

      // Add new place markers
      places.forEach((place) => {
        const marker = new mapboxgl.Marker({ color: "blue" })
          .setLngLat([place.lng, place.lat])
          .setPopup(new mapboxgl.Popup().setText(place.name))
          .addTo(map.current);
        placeMarkersRef.current.push(marker);
      });
    }
  }, [places]);

  useEffect(() => {
    if (map.current && hotels.length > 0) {
      // Clear existing hotel markers
      hotelMarkersRef.current.forEach((marker) => marker.remove());
      hotelMarkersRef.current = [];

      // Add new hotel markers
      hotels.forEach((hotel) => {
        const marker = new mapboxgl.Marker({ color: "green" })
          .setLngLat([hotel.lng, hotel.lat])
          .setPopup(new mapboxgl.Popup().setText(hotel.name))
          .addTo(map.current);
        hotelMarkersRef.current.push(marker);
      });
    }
  }, [hotels]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "100%", height: "100%" }}
      />
      {newPlace && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          <p>
            Marker Position: <br />
            Latitude: {newPlace.lat} <br />
            Longitude: {newPlace.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
