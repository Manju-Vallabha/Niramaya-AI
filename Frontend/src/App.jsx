import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import { Analytics } from "@vercel/analytics/react"
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LabReport from "./pages/LabReport";
import Medicine from "./pages/Medicine";
import Chatbot from "./pages/Chatbot";
import Header from "./components/Header";

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}  // Ensure page change triggers transition
      initial={{ opacity: 0 }}  // Start with the page fully transparent
      animate={{ opacity: 1 }}  // Fade in to fully visible
      exit={{ opacity: 0 }}  // Fade out to fully transparent
      transition={{
        type: 'spring', 
        stiffness: 50, // Slower transition (you can adjust this)
        damping: 30,   // Smoother stop
        duration: 0.8, // Duration of the animation
      }}  // Smooth fading transition
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/Register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/labreport" element={<PageTransition><LabReport /></PageTransition>} />
        <Route path="/medicine" element={<PageTransition><Medicine /></PageTransition>} />
        <Route path="/chatbot" element={<Chatbot />} />
        
      </Routes>
      <Analytics />
    </div>
  );
};

export default App;
