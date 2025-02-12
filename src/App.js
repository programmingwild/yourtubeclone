import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";
import VideoPlayer from "./components/VideoPlayer";
import { Buffer } from 'buffer'; 
import "./styles/global.css";

const App = () => {
  global.Buffer = Buffer;
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setSidebarCollapsed(isSidebarCollapsed);
  };

  return (
    <Router>
      <Header onToggleSidebar={toggleSidebar} />
      <div style={{ display: "flex" }}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className="content">
          <Routes>
            <Route path="/" element={<VideoGrid />} />
            <Route path="/video/:videoId" element={<VideoPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;