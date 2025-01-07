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
  const [newPlace, setNewPlace] = useState(null); // State for new marker coordinates
  const markerRef = useRef(null); // Ref for the marker

  // Function to calculate bounding box around the current location
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

  // Function to fetch tourist place details using a bounding box
  const fetchTouristPlaceDetails = async (latitude, longitude) => {
    const apiKey = "235a929292f84ed0a5587d7ea5eab757";
    const radius = 150; // 50 km
    const { minLat, maxLat, minLon, maxLon } = getBoundingBox(latitude, longitude, radius);

    const apiUrl = `https://api.geoapify.com/v2/places?categories=tourism&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=100&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      // Extract places from the response
      console.log(minLat,minLon,minLon,maxLon);
      const placesData = response.data.features.map((feature) => {
        const coordinates = feature.geometry.coordinates; // Coordinates are in geometry.coordinates
        return {
          name: feature.properties.name,
          lat: coordinates[1], // Latitude
          lng: coordinates[0], // Longitude
        };
      });
      setPlaces(placesData); // Save the extracted places data
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  const fetchHotelPlaces = async(latitude,longitude)=> {
    const apiKey = "235a929292f84ed0a5587d7ea5eab757";
    const radius = 6000; // 50 km

    const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:88.46325020047448,22.580700929770032,${radius}&bias=proximity:88.46325020047448,22.580700929770032&limit=20&apiKey=${apiKey}`
    try{
      const response = await axios.get(url);
      console.log(response)
    }catch(error){
      console.error("Error:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    const initializeMap = (longitude, latitude) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: zoom,
      });

      // Create a marker for the user's location
      const userMarker = new mapboxgl.Marker({ color: "tomato" })
        .setLngLat([longitude, latitude])
        .addTo(map.current);
      markerRef.current = userMarker;

      // Add geolocate control to map
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      });
      map.current.addControl(geolocateControl);

      // Event listener for double-click to add a marker
      map.current.on("dblclick", (e) => {
        const { lng, lat } = e.lngLat;
        setNewPlace({ lng, lat }); // Update state with new coordinates

        // If a marker exists, remove it
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Add a new marker at the double-clicked location
        const marker = new mapboxgl.Marker({ color: "tomato" })
          .setLngLat([lng, lat])
          .addTo(map.current);
        markerRef.current = marker;
        
      });
    };

    // Fetch user's location and initialize the map
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLng = position.coords.longitude;
            const userLat = position.coords.latitude;
            setLng(userLng);
            setLat(userLat);
            initializeMap(userLng, userLat);
            fetchTouristPlaceDetails(userLat, userLng); // Fetch nearby tourist places
            fetchHotelPlaces(userLat,userLng);
          },
          (error) => {
            console.error("Geolocation error:", error);
            alert("Unable to retrieve your location. Showing default location.");
            initializeMap(lng, lat);
            fetchTouristPlaceDetails(lat, lng); // Fetch places for default location
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
        initializeMap(lng, lat);
        fetchTouristPlaceDetails(lat, lng); // Fetch places for default location
      }
    };

    getCurrentLocation(); // Fetch current location and initialize map
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (map.current && places.length > 0) {
      // Add a marker for each tourist place within the bounding box
      places.forEach((place) => {
        new mapboxgl.Marker({ color: "blue" })
          .setLngLat([place.lng, place.lat])
          .setPopup(new mapboxgl.Popup().setText(place.name)) // Add popup with place name
          .addTo(map.current);
      });
    }
  }, [places]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Display Marker Coordinates */}
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
