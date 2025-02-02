import React from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Typography, Avatar } from "@mui/material";
import VideoGrid from "./VideoGrid"; // Related videos
import Sidebar from "./Sidebar";
import Header from "./Header";

const VideoPlayer = () => {
  const location = useLocation();
  const video = location.state?.video;

  if (!video) {
    return <Typography variant="h6">No video selected</Typography>;
  }

  return (
    <Box>
      {/* Header */}
      <Header />

      <Box sx={{ display: "flex", flexDirection: "row", p: 3 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Video Section */}
        <Box sx={{ flex: 3, pr: 2 }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${video.id}`} controls width="100%" height="500px" />
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            {video.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar src="https://via.placeholder.com/40" sx={{ mr: 2 }} />
            <Typography variant="h6">{video.channel}</Typography>
          </Box>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            {video.views} views
          </Typography>
        </Box>

        {/* Related Videos */}
        <Box sx={{ flex: 1 }}>
          <VideoGrid />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
