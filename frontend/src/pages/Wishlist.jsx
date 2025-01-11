import { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import Navbarr from '../component/Navbarr';

const PlaceSearchWishlist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchPlaces = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchQuery)}&format=json&apiKey=235a929292f84ed0a5587d7ea5eab757`
      );
      
      const data = await response.json();
      
      if (data.results) {
        setSearchResults(data.results.map(place => ({
          id: place.place_id,
          name: place.formatted,
          lat: place.lat,
          lon: place.lon
        })));
      }
    } catch (err) {
      setError('Failed to fetch places. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = (place) => {
    if (!wishlist.find(item => item.id === place.id)) {
      setWishlist([...wishlist, place]);
    }
  };

  const removeFromWishlist = (placeId) => {
    setWishlist(wishlist.filter(place => place.id !== placeId));
  };

  return (
    <>
    <Navbarr/>
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Place Search</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchPlaces()}
              placeholder="Search for a place..."
              className="w-full p-2 pr-10 border rounded-lg"
            />
            <Search 
              className="absolute right-3 top-2.5 text-gray-400" 
              size={20}
            />
          </div>
          <button
            onClick={searchPlaces}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Search Results</h3>
            <div className="space-y-2">
              {searchResults.map(place => (
                <div 
                  key={place.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{place.name}</p>
                    <p className="text-sm text-gray-500">
                      Lat: {place.lat.toFixed(4)}, Lon: {place.lon.toFixed(4)}
                    </p>
                  </div>
                  <button
                    onClick={() => addToWishlist(place)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty</p>
        ) : (
          <div className="space-y-2">
            {wishlist.map(place => (
              <div 
                key={place.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{place.name}</p>
                  <p className="text-sm text-gray-500">
                    Lat: {place.lat.toFixed(4)}, Lon: {place.lon.toFixed(4)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromWishlist(place.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default PlaceSearchWishlist;