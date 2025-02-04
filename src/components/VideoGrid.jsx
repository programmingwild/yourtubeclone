import React, { useState } from "react";
import styles from "../styles/VideoGrid.module.css";
import VideoCard from "./VideoCard";
import VideoPlayer from "./VideoPlayer"; // Import the VideoPlayer component
import { useNavigate } from "react-router-dom";

const VideoGrid = () => {
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track the selected video
  const navigate = useNavigate();

  const videos = [
    {
      id: 1,
      title: "React.js Tutorial for Beginners",
      channel: "CodeAcademy",
      views: "1.2M",
      thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Add video URL
    },
    {
      id: 2,
      title: "Learn Redux in 10 Minutes",
      channel: "TechSavvy",
      views: "800K",
      thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Add video URL
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      channel: "DevMaster",
      views: "500K",
      thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Add video URL
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox",
      channel: "WebDesignPro",
      views: "620K",
      thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Add video URL
    },
    {
      id: 5,
      title: "Node.js Crash Course",
      channel: "FullStackHQ",
      views: "900K",
      thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Add video URL
    },
    {
      id: 6,
      title: "Next.js vs React: What to Choose?",
      channel: "TechTrends",
      views: "720K",
      thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Add video URL
    },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video); // Set the selected video
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null); // Close the video player
  };

  return (
    <div className={styles.videoGrid}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          channel={video.channel}
          views={video.views}
          thumbnail={video.thumbnail}
          onClick={() => handleVideoClick(video)}
        />
      ))}

      {/* Render Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={handleClosePlayer} />
      )}
    </div>
  );
};

export default VideoGrid;