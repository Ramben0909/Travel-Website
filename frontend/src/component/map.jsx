import { useRef, useState, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import axios from "axios";
import { useWishlist } from "../context/useWishList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Cache keys for localStorage
const CACHE_KEYS = {
  PLACES: 'map_places_cache',
  HOTELS: 'map_hotels_cache',
  LAST_POSITION: 'map_last_position',
  SEARCH_TEXT: 'map_search_text'
};

// Cache expiry time (30 minutes)
const CACHE_EXPIRY = 30 * 60 * 1000;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(87.1413);
  const [lat, setLat] = useState(23.10166);
  const [zoom, setZoom] = useState(12);
  const [places, setPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const markerRef = useRef(null);
  const placeMarkersRef = useRef([]);
  const hotelMarkersRef = useRef([]);
  const searchMarkerRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  // Track last fetch coordinates to prevent redundant calls
  const lastFetchRef = useRef({ lat: null, lng: null, timestamp: null });

  // ✅ Wishlist Context
  const { addToWishlist, isInWishlist } = useWishlist();

  // ✅ Cache helper functions
  const saveToCache = (key, data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save to cache:', error);
    }
  };

  const getFromCache = (key) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch (error) {
      console.warn('Failed to get from cache:', error);
      return null;
    }
  };

  const getCacheKey = (baseKey, lat, lng) => {
    return `${baseKey}_${Math.round(lat * 100)}_${Math.round(lng * 100)}`;
  };

  // ✅ Check if we need to fetch data (distance-based caching)
  const shouldFetchData = useCallback((latitude, longitude) => {
    const lastFetch = lastFetchRef.current;
    if (!lastFetch.lat || !lastFetch.lng) return true;
    
    // Calculate distance between current and last fetch position
    const distance = Math.sqrt(
      Math.pow(latitude - lastFetch.lat, 2) + 
      Math.pow(longitude - lastFetch.lng, 2)
    );
    
    // If moved more than ~1km or cache expired, fetch new data
    const DISTANCE_THRESHOLD = 0.01; // roughly 1km
    const TIME_THRESHOLD = 10 * 60 * 1000; // 10 minutes
    
    return distance > DISTANCE_THRESHOLD || 
           (Date.now() - lastFetch.timestamp) > TIME_THRESHOLD;
  }, []);

  // ⭐ Rating system
  const handleRating = (place) => {
    const rating = prompt(`Rate ${place.name} (1-5 stars):`);
    if (rating && rating >= 1 && rating <= 5) {
      alert(`You rated ${place.name} ⭐ ${rating}/5`);
    } else {
      alert("Invalid rating! Please enter a number between 1 and 5.");
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const apiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query
      )}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;
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

    // Save search text to cache
    saveToCache(CACHE_KEYS.SEARCH_TEXT, name);

    if (map.current.getLayer("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    // Remove all existing markers
    placeMarkersRef.current.forEach((marker) => marker.remove());
    placeMarkersRef.current = [];
    hotelMarkersRef.current.forEach((marker) => marker.remove());
    hotelMarkersRef.current = [];

    // Clear current data and fetch new
    setPlaces([]);
    setHotels([]);
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

  const fetchTouristPlaceDetails = async (latitude, longitude, forceRefresh = false) => {
    // Check cache first if not forcing refresh
    if (!forceRefresh) {
      const cacheKey = getCacheKey(CACHE_KEYS.PLACES, latitude, longitude);
      const cachedPlaces = getFromCache(cacheKey);
      if (cachedPlaces) {
        console.log('Loading places from cache');
        setPlaces(cachedPlaces);
        return;
      }
    }

    // Check if we should fetch based on distance/time
    if (!forceRefresh && !shouldFetchData(latitude, longitude)) {
      console.log('Skipping places fetch - too close to last fetch');
      return;
    }

    try {
      console.log('Fetching places from API');
      const { minLat, maxLat, minLon, maxLon } = getBoundingBox(
        latitude,
        longitude,
        150
      );
      const apiUrl = `https://api.geoapify.com/v2/places?categories=tourism&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=50&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;
      const res = await axios.get(apiUrl);
      
      const placesData = res.data.features.map((f) => ({
        name: f.properties.name,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      }));

      setPlaces(placesData);
      
      // Cache the results
      const cacheKey = getCacheKey(CACHE_KEYS.PLACES, latitude, longitude);
      saveToCache(cacheKey, placesData);
      
      // Update last fetch position
      lastFetchRef.current = { lat: latitude, lng: longitude, timestamp: Date.now() };
      
    } catch (error) {
      console.log("error fetching places", error);
    }
  };

  const fetchHotelPlaces = async (latitude, longitude, forceRefresh = false) => {
    // Check cache first if not forcing refresh
    if (!forceRefresh) {
      const cacheKey = getCacheKey(CACHE_KEYS.HOTELS, latitude, longitude);
      const cachedHotels = getFromCache(cacheKey);
      if (cachedHotels) {
        console.log('Loading hotels from cache');
        setHotels(cachedHotels);
        return;
      }
    }

    // Check if we should fetch based on distance/time
    if (!forceRefresh && !shouldFetchData(latitude, longitude)) {
      console.log('Skipping hotels fetch - too close to last fetch');
      return;
    }

    try {
      console.log('Fetching hotels from API');
      const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},6000&limit=20&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;
      const res = await axios.get(url);
      
      const hotelsData = res.data.features.map((f) => ({
        name: f.properties.name || "Unnamed Hotel",
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      }));

      setHotels(hotelsData);
      
      // Cache the results
      const cacheKey = getCacheKey(CACHE_KEYS.HOTELS, latitude, longitude);
      saveToCache(cacheKey, hotelsData);
      
    } catch (error) {
      console.log("error fetching hotels", error);
    }
  };

  // ✅ Show Direction function (kept intact)
  const showDirection = async (place) => {
    if (!map.current) return;
    const originLat = lat;
    const originLng = lng;
    const destLat = place.lat;
    const destLng = place.lng;
    try {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${originLat},${originLng}|${destLat},${destLng}&mode=drive&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;
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
    } catch (error) {
      console.log("error", error);
    }
  };

  // ✅ Add Marker Buttons (restricted wishlist for hotels)
  const createMarkerButtons = (marker, place, type = "place") => {
    const popupDiv = document.createElement("div");
    popupDiv.style.fontFamily = "sans-serif";
    popupDiv.style.padding = "5px";
    popupDiv.style.maxWidth = "200px";

    const nameEl = document.createElement("h4");
    nameEl.textContent = place.name;
    nameEl.style.margin = "5px 0";
    nameEl.style.fontSize = "16px";

    const starRating = document.createElement("div");
    const ratingValue = Math.floor(Math.random() * 5) + 1;
    starRating.innerHTML =
      "★".repeat(ratingValue) + "☆".repeat(5 - ratingValue);
    starRating.style.color = "#FFD700";
    starRating.style.fontSize = "16px";
    starRating.style.marginBottom = "5px";

    const directionBtn = document.createElement("button");
    directionBtn.textContent = "Show Route";
    directionBtn.style.cssText =
      "margin: 2px; padding: 5px; width: 100%; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;";
    directionBtn.onclick = () => showDirection(place);

    const wishlistBtn = document.createElement("button");
    wishlistBtn.textContent = "Add to Wishlist";
    wishlistBtn.style.cssText =
      "margin: 2px; padding: 5px; width: 100%; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;";
    wishlistBtn.onclick = () => {
      if (type === "hotel") {
        toast.error("Hotels cannot be wishlisted ❌");
        return;
      }
      const newPlace = {
        id: `${place.lat}-${place.lng}`,
        name: place.name,
        lat: place.lat,
        lon: place.lng,
      };
      if (!isInWishlist(newPlace.id)) {
        addToWishlist(newPlace);
        // toast.success(`${place.name} added to wishlist ✅`);
      }
    };

    popupDiv.appendChild(nameEl);
    popupDiv.appendChild(starRating);
    popupDiv.appendChild(directionBtn);
    popupDiv.appendChild(wishlistBtn);

    const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupDiv);
    marker.setPopup(popup);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    const apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      searchText
    )}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;

    try {
      const response = await axios.get(apiUrl);

      if (response.data && response.data.results.length > 0) {
        const result = response.data.results[0];
        const searchLng = result.lon;
        const searchLat = result.lat;

        if (searchMarkerRef.current) {
          searchMarkerRef.current.remove();
        }
        if (markerRef.current) {
          markerRef.current.remove();
        }

        const searchMarker = new mapboxgl.Marker({ color: "red" })
          .setLngLat([searchLng, searchLat])
          .setPopup(new mapboxgl.Popup().setText(searchText))
          .addTo(map.current);
        searchMarkerRef.current = searchMarker;

        map.current.flyTo({
          center: [searchLng, searchLat],
          essential: true,
        });

        setLat(searchLat);
        setLng(searchLng);

        // Save search text and position to cache
        saveToCache(CACHE_KEYS.SEARCH_TEXT, searchText);
        saveToCache(CACHE_KEYS.LAST_POSITION, { lat: searchLat, lng: searchLng });

        if (map.current.getLayer("route")) {
          map.current.removeLayer("route");
          map.current.removeSource("route");
        }

        setPlaces([]);
        setHotels([]);

        placeMarkersRef.current.forEach((marker) => marker.remove());
        placeMarkersRef.current = [];
        hotelMarkersRef.current.forEach((marker) => marker.remove());
        hotelMarkersRef.current = [];

        fetchTouristPlaceDetails(searchLat, searchLng, true); // Force refresh for new search
        fetchHotelPlaces(searchLat, searchLng, true);
      } else {
        alert("No results found for the entered location.");
      }
    } catch (error) {
      console.error(
        "Error searching for location:",
        error.response?.data || error.message
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
          
          // Save position to cache
          saveToCache(CACHE_KEYS.LAST_POSITION, { lat: userLat, lng: userLng });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert(
            "Unable to retrieve your location. Showing default location."
          );
          initializeMap(lng, lat);
          fetchTouristPlaceDetails(lat, lng);
          fetchHotelPlaces(lat, lng);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      initializeMap(lng, lat);
      fetchTouristPlaceDetails(lat, lng);
      fetchHotelPlaces(lat, lng);
    }
  };

  const initializeMap = (longitude, latitude) => {
    if (map.current) {
      // Map already initialized, just update center
      map.current.setCenter([longitude, latitude]);
      return;
    }

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
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserLocation: true,
    });
    map.current.addControl(geolocateControl);

    map.current.on("dblclick", (e) => {
      const { lng, lat } = e.lngLat;
      setNewPlace({ lng, lat });

      if (markerRef.current) markerRef.current.remove();
      if (searchMarkerRef.current) searchMarkerRef.current.remove();

      const marker = new mapboxgl.Marker({ color: "tomato" })
        .setLngLat([lng, lat])
        .addTo(map.current);
      markerRef.current = marker;

      map.current.flyTo({ center: [lng, lat], essential: true });
      setZoom(12);
      setLat(lat);
      setLng(lng);

      // Save position to cache
      saveToCache(CACHE_KEYS.LAST_POSITION, { lat, lng });

      placeMarkersRef.current.forEach((marker) => marker.remove());
      placeMarkersRef.current = [];
      hotelMarkersRef.current.forEach((marker) => marker.remove());
      hotelMarkersRef.current = [];

      if (map.current.getLayer("route")) {
        map.current.removeLayer("route");
        map.current.removeSource("route");
      }

      setPlaces([]);
      setHotels([]);
      fetchTouristPlaceDetails(lat, lng, true); // Force refresh for new location
      fetchHotelPlaces(lat, lng, true);
    });

    setIsInitialized(true);
  };

  // ✅ Load cached state on component mount
  useEffect(() => {
    const loadCachedState = () => {
      // Load last position
      const cachedPosition = getFromCache(CACHE_KEYS.LAST_POSITION);
      if (cachedPosition) {
        setLat(cachedPosition.lat);
        setLng(cachedPosition.lng);
        
        // Load cached search text
        const cachedSearchText = getFromCache(CACHE_KEYS.SEARCH_TEXT);
        if (cachedSearchText) {
          setSearchText(cachedSearchText);
        }

        // Load cached places and hotels
        const placesKey = getCacheKey(CACHE_KEYS.PLACES, cachedPosition.lat, cachedPosition.lng);
        const hotelsKey = getCacheKey(CACHE_KEYS.HOTELS, cachedPosition.lat, cachedPosition.lng);
        
        const cachedPlaces = getFromCache(placesKey);
        const cachedHotels = getFromCache(hotelsKey);
        
        if (cachedPlaces) setPlaces(cachedPlaces);
        if (cachedHotels) setHotels(cachedHotels);

        // Initialize map with cached position
        initializeMap(cachedPosition.lng, cachedPosition.lat);
        
        // Only fetch if cache is missing or expired
        if (!cachedPlaces || !cachedHotels) {
          fetchTouristPlaceDetails(cachedPosition.lat, cachedPosition.lng);
          fetchHotelPlaces(cachedPosition.lat, cachedPosition.lng);
        }
        
        return true; // Indicate that cached state was loaded
      }
      return false; // No cached state found
    };

    // Try to load cached state first, otherwise get current location
    if (!loadCachedState()) {
      getCurrentLocation();
    }
  }, []);

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

        createMarkerButtons(marker, place, "place");
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

        createMarkerButtons(marker, hotel, "hotel");
        hotelMarkersRef.current.push(marker);
      });
    }
  }, [hotels]);

  // ✅ Clear cache function (for debugging or manual refresh)
  const clearCache = () => {
    Object.values(CACHE_KEYS).forEach(key => {
      // Clear all cache entries that start with this key
      Object.keys(localStorage).forEach(storageKey => {
        if (storageKey.startsWith(key)) {
          localStorage.removeItem(storageKey);
        }
      });
    });
    console.log('Cache cleared');
    // Force refresh data
    fetchTouristPlaceDetails(lat, lng, true);
    fetchHotelPlaces(lat, lng, true);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1000,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          width: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Search for a place"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          style={{ padding: "5px", marginRight: "5px", width: "200px" }}
        />
        <button 
          onClick={clearCache}
          style={{ 
            padding: "5px", 
            fontSize: "12px", 
            backgroundColor: "#dc3545", 
            color: "white", 
            border: "none", 
            borderRadius: "3px",
            cursor: "pointer",
            marginLeft: "50px"
          }}
          title="Clear cache and refresh data"
        >
          🔄
        </button>
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: "5px",
              margin: 0,
              maxHeight: "150px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSearchSelect(suggestion)}
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
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