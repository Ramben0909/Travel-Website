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
import { ToastContainer } from 'react-toastify';
import Landing from "./pages/Landing"
function App() {
  return (
    <>
    <AuthProvider>
      <WishlistProvider>
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
      </WishlistProvider>
      <ToastContainer />
    </AuthProvider>
    <Landing/>
    </>
  );
}

export default App;
