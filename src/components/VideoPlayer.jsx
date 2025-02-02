import React, { useState, useRef } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { TiDownload } from "react-icons/ti";
import { MdInsertComment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoChatbubbles } from "react-icons/io5";
import styles from "../styles/VideoPlayer.module.css";
// Assuming Razorpay integration comes later
// import Razorpay from "razorpay";

const VideoPlayer = ({ video, onClose, onNextVideo }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState(null);

  if (!video) return null; // If no video is selected, don't render the player

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false); // Remove dislike if liked
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false); // Remove like if disliked
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href); // Copy video URL to clipboard
    alert("Link copied to clipboard!");
  };

  const handleDownload = () => {
    // Check if the user is premium
    const isPremiumUser = localStorage.getItem("isPremiumUser") === "true";

    // Check download limit for non-premium users
    if (!isPremiumUser) {
      const today = new Date().toLocaleDateString();
      const lastDownloadDate = localStorage.getItem("lastDownloadDate");
      const downloadCount = parseInt(localStorage.getItem("downloadCount") || "0");

      if (lastDownloadDate === today && downloadCount >= 1) {
        alert("You have reached your daily download limit. Go to User Circle and Click Premium Package for unlimited downloads.");
        return;
      }

      // Update download count and date
      if (lastDownloadDate !== today) {
        localStorage.setItem("lastDownloadDate", today);
        localStorage.setItem("downloadCount", "1");
      } else {
        localStorage.setItem("downloadCount", (downloadCount + 1).toString());
      }
    }

    // Proceed with download
    const link = document.createElement("a");
    link.href = video.videoUrl;
    link.download = video.title + ".mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleComment = () => {
    alert("Comments are not implemented yet!");
  };

  const handlePCR = () => {
    alert("PCR are not implemented yet!");
  };


  // Gesture Controls Handler
  const handleGesture = (event) => {
    const { clientX } = event;
    const video = videoRef.current;
    const videoWidth = video.offsetWidth;
    const tapPosition = clientX / videoWidth;

    setTapCount((prev) => prev + 1);

    if (tapTimeout) clearTimeout(tapTimeout);
    
    const newTimeout = setTimeout(() => {
      if (tapCount === 1) {
        // Single tap (middle) - Pause/Play
        if (tapPosition > 0.3 && tapPosition < 0.7) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      } else if (tapCount === 2) {
        // Double tap (left or right) - Seek
        if (tapPosition < 0.3) {
          video.currentTime = Math.max(0, video.currentTime - 10);
        } else if (tapPosition > 0.7) {
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
        }
      } else if (tapCount === 3) {
        // Triple tap actions
        if (tapPosition > 0.3 && tapPosition < 0.7) {
          // Triple tap (middle) - Next Video
          alert("Next video triggered! (Implement logic)");
          onNextVideo && onNextVideo();
        } else if (tapPosition > 0.7) {
          // Triple tap (right) - Close website
          alert("Closing website...");
          window.close();
        } else if (tapPosition < 0.3) {
          // Triple tap (left) - Show comment section
          handleComment();
        }
      }
      setTapCount(0);
    }, 300);

    setTapTimeout(newTimeout);
  };


  return (
    <div className={styles.videoPlayerOverlay}>
      <div className={styles.videoPlayerContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <video
          className={styles.videoPlayer}
          controls
          autoPlay
          unmuted
          ref={videoRef}
          onClick={handleGesture}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.videoDetails}>
          <h2 className={styles.videoTitle}>{video.title}</h2>
          <p className={styles.videoChannel}>{video.channel}</p>
          <p className={styles.videoViews}>{video.views} views</p>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.button} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          >
            <BiLike size={25} /> {liked ? "Liked" : "Like"}
          </button>

          <button
            className={`${styles.button} ${disliked ? styles.disliked : ""}`}
            onClick={handleDislike}
          >
            <BiDislike size={25} /> {disliked ? "Disliked" : "Dislike"}
          </button>

          <button className={styles.button} onClick={handleShare}>
            <IoMdShareAlt size={25} /> Share
          </button>

          <button className={styles.button} onClick={handleDownload}>
            <TiDownload size={25} /> Download
          </button>

          <button className={styles.button} onClick={handleComment}>
          <MdInsertComment size={25} /> Comment
        </button>

        <button className={styles.button} onClick={handlePCR}>
          <IoChatbubbles size={25} /> Private Chat Room
        </button>
        </div>


      </div>
    </div>
  );
};

export default VideoPlayer;
