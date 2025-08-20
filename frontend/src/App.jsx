import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import Services from "./pages/Services";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Profile from "./component/Profile";
import Contact from "./pages/Contact";
import TravelPlanner from "./pages/TravelPlanner";
import { WishlistProvider } from "./context/WishListContext";
import { AuthProvider } from "./context/authContext";
import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import { useAuth0 } from "@auth0/auth0-react";  // ✅ import auth0

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth0();

  // While Auth0 is loading, don’t flash content
  if (isLoading) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

  // If not logged in → show Landing page
  if (!isAuthenticated) {
    return <Landing />;
  }

  // If logged in → show routes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Homepage /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/travelplanner" element={<MainLayout><TravelPlanner /></MainLayout>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <AppContent />
        <ToastContainer />
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
