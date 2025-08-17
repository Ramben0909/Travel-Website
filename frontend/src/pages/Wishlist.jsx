import { useAuthContext } from "../context/useAuthContext";
import { useWishlist } from "../context/useWishList";

const Wishlist = () => {
  const { isAuthenticated, user, isLoading } = useAuthContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p>Please log in to view wishlist.</p>;
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{
        color: "#2c7be5",
        borderBottom: "2px solid #e1e7ec",
        paddingBottom: "10px",
        marginBottom: "20px"
      }}>
        {user?.name ? `${user.name}'s` : "Your"} Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div style={{
          backgroundColor: "#f8fafd",
          border: "1px dashed #d8e2ef",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          color: "#6e84a3"
        }}>
          <p>No items in your wishlist yet.</p>
        </div>
      ) : (
        <ul style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gap: "15px"
        }}>
          {wishlist.map((item) => (
            <li key={item.id} style={{
              backgroundColor: "#f8fafd",
              border: "1px solid #e1e7ec",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <strong style={{
                    color: "#2c7be5",
                    fontSize: "18px"
                  }}>{item.name}</strong>
                  <div style={{
                    color: "#6e84a3",
                    fontSize: "14px",
                    marginTop: "5px"
                  }}>
                    Coordinates: ({item.lat}, {item.lon})
                  </div>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  style={{
                    backgroundColor: "#ff5b5b",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background-color 0.2s",
                    fontWeight: "500",
                    height: "fit-content",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#ff3b3b"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ff5b5b"}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;