import { useAuthContext } from "../context/useAuthContext";
import { useWishlist } from "../context/useWishList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wishlist = () => {
  const { isAuthenticated, user, isLoading } = useAuthContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleTravelRecommendation = (placeName) => {
    console.log('Navigating with place name:', placeName); // Debug log
    navigate('/TravelPLanner', { state: { placeName: placeName } });
  };

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
            <li 
              key={item.id} 
              style={{
                backgroundColor: "#f8fafd",
                border: "1px solid #e1e7ec",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                position: "relative"
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ flex: 1 }}>
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
                
                <div style={{ 
                  display: "flex", 
                  gap: "10px", 
                  alignItems: "center" 
                }}>
                  <button
                    onClick={() => handleTravelRecommendation(item.name)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.2s",
                      fontWeight: "500",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#218838"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#28a745"}
                  >
                    Show Travel Recommendation
                  </button>

                  {/* Delete Icon - appears on hover */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#ff5b5b",
                      border: "none",
                      padding: "8px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "18px",
                      transition: "all 0.2s",
                      opacity: hoveredItem === item.id ? 1 : 0,
                      transform: hoveredItem === item.id ? "scale(1)" : "scale(0.8)",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff5b5b";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#ff5b5b";
                    }}
                    title="Delete from wishlist"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;