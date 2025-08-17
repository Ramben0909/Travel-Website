// src/layouts/MainLayout.js
import Navbar from "../component/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main style={{ padding: "1rem" }}>
        {children}
      </main>
      <footer style={{ textAlign: "center", padding: "1rem", marginTop: "2rem", borderTop: "1px solid #ddd" }}>
        © {new Date().getFullYear()} My Website
      </footer>
    </div>
  );
};

export default MainLayout;
