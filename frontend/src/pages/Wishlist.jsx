import { useAuthContext } from "../context/useAuthContext";
import { useWishlist } from "../context/useWishList";

const Wishlist = () => {
  const { isLoggedIn, profile } = useAuthContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (!isLoggedIn) {
    return <p>Please log in to view wishlist.</p>;
  }

  return (
    <div>
      <h2>{profile?.name ? `${profile.name}'s` : "Your"} Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in your wishlist yet.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <br />
              <small>
                Coordinates: ({item.lat}, {item.lon})
              </small>
              <br />
              <button
                onClick={() => removeFromWishlist(item.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Test button - remove when backend is connected */}
      <button
        onClick={() =>
          addToWishlist({
            id: `test-${Date.now()}`,
            name: "Test Place",
            lat: 48.8584,
            lon: 2.2945,
          })
        }
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Add Test Place
      </button>
    </div>
  );
};

export default Wishlist;
