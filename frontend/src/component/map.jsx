import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import axios from "axios";
import { useWishlist } from "../context/WishListContext.jsx";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(87.1413);
  const [lat, setLat] = useState(23.10166);
  const [zoom, setZoom] = useState(12);
  const [places, setPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const markerRef = useRef(null);
  const placeMarkersRef = useRef([]);
  const hotelMarkersRef = useRef([]);
  const searchMarkerRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Wishlist Context
  const { addToWishlist, isInWishlist } = useWishlist();

  // ⭐ Rating system
  const handleRating = (place) => {
    const rating = prompt(`Rate ${place.name} (1-5 stars):`);
    if (rating && rating >= 1 && rating <= 5) {
      alert(`You rated ${place.name} ⭐ ${rating}/5`);
    } else {
      alert("Invalid rating! Please enter a number between 1 and 5.");
    }
  };

  // ✅ Fetch autocomplete suggestions
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const apiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query
      )}&apiKey=235a929292f84ed0a5587d7ea5eab757`;
      const res = await axios.get(apiUrl);
      if (res.data?.features) {
        setSuggestions(
          res.data.features.map((f) => ({
            name: f.properties.formatted,
            lat: f.properties.lat,
            lng: f.properties.lon,
          }))
        );
      }
    } catch {
      setSuggestions([]);
    }
  };

  // ✅ Search select handler
  const handleSearchSelect = (suggestion) => {
    const { lat, lng, name } = suggestion;
    if (searchMarkerRef.current) searchMarkerRef.current.remove();
    if (markerRef.current) markerRef.current.remove();

    const searchMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setText(name))
      .addTo(map.current);

    searchMarkerRef.current = searchMarker;
    map.current.flyTo({ center: [lng, lat], essential: true });

    setLat(lat);
    setLng(lng);
    setSearchText(name);
    setSuggestions([]);
    setPlaces([]);
    setHotels([]);
    placeMarkersRef.current.forEach((m) => m.remove());
    hotelMarkersRef.current.forEach((m) => m.remove());

    fetchTouristPlaceDetails(lat, lng);
    fetchHotelPlaces(lat, lng);
  };

  const getBoundingBox = (latitude, longitude, radius) => {
    const R = 6371;
    const dLat = radius / R;
    const dLon = radius / (R * Math.cos((Math.PI * latitude) / 180));
    return {
      minLat: latitude - (dLat * 180) / Math.PI,
      maxLat: latitude + (dLat * 180) / Math.PI,
      minLon: longitude - (dLon * 180) / Math.PI,
      maxLon: longitude + (dLon * 180) / Math.PI,
    };
  };

  const fetchTouristPlaceDetails = async (latitude, longitude) => {
    try {
      const { minLat, maxLat, minLon, maxLon } = getBoundingBox(latitude, longitude, 150);
      const apiUrl = `https://api.geoapify.com/v2/places?categories=tourism&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=50&apiKey=235a929292f84ed0a5587d7ea5eab757`;
      const res = await axios.get(apiUrl);
      setPlaces(
        res.data.features.map((f) => ({
          name: f.properties.name,
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        }))
      );
    } catch {}
  };

  const fetchHotelPlaces = async (latitude, longitude) => {
    try {
      const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},6000&limit=20&apiKey=235a929292f84ed0a5587d7ea5eab757`;
      const res = await axios.get(url);
      setHotels(
        res.data.features.map((f) => ({
          name: f.properties.name || "Unnamed Hotel",
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        }))
      );
    } catch {}
  };

  // ✅ Show Direction function (kept intact)
  const showDirection = async (place) => {
    if (!map.current) return;
    const originLat = lat;
    const originLng = lng;
    const destLat = place.lat;
    const destLng = place.lng;
    try {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${originLat},${originLng}|${destLat},${destLng}&mode=drive&apiKey=235a929292f84ed0a5587d7ea5eab757`;
      const res = await axios.get(url);

      if (res.data?.features?.length) {
        const routeGeoJson = res.data.features[0].geometry;

        if (map.current.getLayer("route")) {
          map.current.removeLayer("route");
          map.current.removeSource("route");
        }

        map.current.addSource("route", {
          type: "geojson",
          data: { type: "Feature", geometry: routeGeoJson },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#FF5733", "line-width": 5 },
        });

        map.current.flyTo({ center: [destLng, destLat], essential: true });
      }
    } catch {}
  };

  // ✅ Add Marker Buttons (3 buttons)
  const createMarkerButtons = (marker, place) => {
    const directionBtn = document.createElement("button");
    directionBtn.textContent = "Show Direction";

    const wishlistBtn = document.createElement("button");
    wishlistBtn.textContent = "Add to Wishlist";

    const ratingBtn = document.createElement("button");
    ratingBtn.textContent = "Rate ★";

    [directionBtn, wishlistBtn, ratingBtn].forEach((btn) => {
      btn.style.display = "none";
      btn.style.marginTop = "3px";
      btn.style.padding = "5px";
      btn.style.borderRadius = "5px";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.backgroundColor = "#007BFF";
      btn.style.color = "#fff";
      marker.getElement().appendChild(btn);
    });

    // ✅ Keep Show Direction intact
    directionBtn.addEventListener("click", () => showDirection(place));

    // ✅ Add to Wishlist
    wishlistBtn.addEventListener("click", () => {
      const newPlace = { id: `${place.lat}-${place.lng}`, name: place.name, lat: place.lat, lon: place.lng };
      if (!isInWishlist(newPlace.id)) addToWishlist(newPlace);
    });

    // ✅ Rating
    ratingBtn.addEventListener("click", () => handleRating(place));

    marker.getElement().addEventListener("mouseenter", () => {
      directionBtn.style.display = wishlistBtn.style.display = ratingBtn.style.display = "block";
    });
    marker.getElement().addEventListener("mouseleave", () => {
      directionBtn.style.display = wishlistBtn.style.display = ratingBtn.style.display = "none";
    });
  };

  // ✅ Add Markers for Places
  useEffect(() => {
    if (map.current && places.length > 0) {
      placeMarkersRef.current.forEach((m) => m.remove());
      placeMarkersRef.current = [];

      places.forEach((place) => {
        const marker = new mapboxgl.Marker({ color: "blue" })
          .setLngLat([place.lng, place.lat])
          .setPopup(new mapboxgl.Popup().setText(place.name))
          .addTo(map.current);

        createMarkerButtons(marker, place);
        placeMarkersRef.current.push(marker);
      });
    }
  }, [places]);

  // ✅ Add Markers for Hotels
  useEffect(() => {
    if (map.current && hotels.length > 0) {
      hotelMarkersRef.current.forEach((m) => m.remove());
      hotelMarkersRef.current = [];

      hotels.forEach((hotel) => {
        const marker = new mapboxgl.Marker({ color: "green" })
          .setLngLat([hotel.lng, hotel.lat])
          .setPopup(new mapboxgl.Popup().setText(hotel.name))
          .addTo(map.current);

        createMarkerButtons(marker, hotel);
        hotelMarkersRef.current.push(marker);
      });
    }
  }, [hotels]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom,
      });
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000, backgroundColor: "white", padding: 10 }}>
        <input
          type="text"
          placeholder="Search for a place"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          style={{ padding: "5px", marginRight: "5px" }}
        />
        {suggestions.length > 0 && (
          <ul style={{ listStyle: "none", padding: 5, margin: 0, background: "#fff" }}>
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => handleSearchSelect(s)} style={{ padding: 5, cursor: "pointer" }}>
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div ref={mapContainer} className="map-container" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Map;
