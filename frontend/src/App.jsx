import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Team from "./pages/Team";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";

export default function App() {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/join" element={<PageTransition><Join /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
