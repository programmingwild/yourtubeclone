import React, { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { TiDownload } from "react-icons/ti";
import { MdInsertComment, MdOutlineSkipNext } from "react-icons/md";
import { IoChatbubbles } from "react-icons/io5";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp, FaExpand, FaCompress, FaForward, FaBackward, FaInfoCircle } from "react-icons/fa";
import PrivateChatRoom from "./PrivateChatRoom";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import Comment from "./Comment";
import VideoGrid from "./VideoGrid";
import styles from "../styles/VideoPlayer.module.css";

const VideoPlayer = ({ video, onClose, videos, setSelectedVideo }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkFullScreen = () => {
      setIsFullScreen(screenfull.isFullscreen);
    };
  
    screenfull.on("change", checkFullScreen);
    return () => screenfull.off("change", checkFullScreen);
  }, []);

  const handleSeek = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds);
    }
  };

  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
  };

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerRef.current.wrapper); // Make the video go full screen
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleDownload = () => {
    const isPremiumUser = localStorage.getItem("isPremiumUser") === "true";
    const today = new Date().toLocaleDateString();
    const lastDownloadDate = localStorage.getItem("lastDownloadDate");
    const downloadCount = parseInt(localStorage.getItem("downloadCount") || "0");

    if (!isPremiumUser && lastDownloadDate === today && downloadCount >= 1) {
      alert("You have reached your daily download limit. Upgrade to premium for unlimited downloads.");
      return;
    }

    if (lastDownloadDate !== today) {
      localStorage.setItem("lastDownloadDate", today);
      localStorage.setItem("downloadCount", "1");
    } else {
      localStorage.setItem("downloadCount", (downloadCount + 1).toString());
    }

    const link = document.createElement("a");
    link.href = video.videoUrl;
    link.download = `${video.title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleChatRoom = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === video.id);
    if (currentIndex !== -1 && currentIndex < videos.length - 1) {
      setSelectedVideo(videos[currentIndex + 1]); // Go to next video
    } else {
      setSelectedVideo(videos[0]); // Loop back to first video
    }
  };

  if (!video) return null;

  return (
    <div className={styles.videoPlayerOverlay}>
      <div className={styles.videoPlayerContainer}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        <div className={styles.videoPlayerWrapper}>
          <ReactPlayer
            ref={playerRef}
            url={video.videoUrl}
            playing={playing}
            loop={false}
            controls={false}
            muted={muted}
            playbackRate={speed}
            width="100%"
            height="100%"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            style={{ position: 'absolute', top: 0, left: 0 }}
            onProgress={({ played }) => setProgress(played * 100)}
          />

          {showPopup && (
            <div className={styles.popup}>
              <p>🎥 Gesture-based controls may or may not work, so Use the Buttons below for control.</p>
              <button onClick={() => setShowPopup(false)}>Got it!</button>
            </div>
          )}

          <div className={styles.gestureControls} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
            <div className={styles.buttonWrapper} data-tooltip="Rewind 10s">
              <button className={styles.gestureButton} onClick={() => handleSeek(-10)}>
                <TbRewindBackward10 size={16} />
              </button>
            </div>

            <div className={styles.progressBarContainer}>
              <input
                type="range"
                className={styles.progressBar}
                min="0"
                max="100"
                value={progress}
                onChange={(e) => {
                  const newTime = (e.target.value / 100) * playerRef.current.getDuration();
                  playerRef.current.seekTo(newTime, "seconds");
                  setProgress(e.target.value);
                }}
              />
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Playback Speed">
              <select className={styles.speedSelect} value={speed} onChange={handleSpeedChange}>
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Play / Pause">
              <button className={styles.gestureButton} onClick={() => setPlaying((prev) => !prev)}>
                {playing ? <FaPause /> : <FaPlay />} 
              </button>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Forward 10s">
              <button className={styles.gestureButton} onClick={() => handleSeek(10)}>
                <TbRewindForward10 size={16} />
              </button>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Next Video">
              <button className={styles.gestureButton} onClick={handleNextVideo}>
                <MdOutlineSkipNext size={18} />
              </button>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Close Website">
              <button className={styles.gestureButton} onClick={() => {
                window.open('about:blank', '_self');
                window.close();
              }}>
                ❌
              </button>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Show Comments">
              <button className={styles.gestureButton} onClick={() => setIsCommentOpen(true)}>💬</button>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Gesture-Based Controls as Buttons">
              <button className={styles.gestureButton}>
                <FaInfoCircle size={16} />
              </button>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Mute / Unmute">
              <button className={styles.gestureButton} onClick={() => setMuted((prev) => !prev)}>
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>

            <div className={styles.buttonWrapper} data-tooltip="Full Screen">
            {!isFullScreen && (
            <button className={styles.gestureButton} onClick={handleFullScreen}>
              <FaExpand size={16} />
            </button>
          )}
            </div>
          </div>
        </div>

        <div className={styles.videoDetails}>
          <h2 className={styles.videoTitle}>{video.title}</h2>
          <p className={styles.videoChannel}>{video.channel}</p>
          <p className={styles.videoViews}>{video.views} views</p>
        </div>
      </div>
      <div className={styles.actionButtons} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        
        <button className={`${styles.button} ${liked ? styles.liked : ""}`} onClick={handleLike}>
          <BiLike size={25} /> {liked ? "Liked" : "Like"}
        </button>

        <button className={`${styles.button} ${disliked ? styles.disliked : ""}`} onClick={handleDislike}>
          <BiDislike size={25} /> {disliked ? "Disliked" : "Dislike"}
        </button>

        <button className={styles.button} onClick={handleShare}>
          <IoMdShareAlt size={25} /> Share
        </button>

        <button className={styles.button} onClick={handleDownload}>
          <TiDownload size={25} /> Download
        </button>

        <button className={styles.button} onClick={() => setIsCommentOpen((prev) => !prev)}>
          <MdInsertComment size={25} /> Comment
        </button>

        <button className={styles.button} onClick={toggleChatRoom}>
          <IoChatbubbles size={25} /> Private Chat Room
        </button>
      </div>
      {isChatOpen && <PrivateChatRoom onClose={() => setIsChatOpen(false)} />}
      {isCommentOpen && <Comment onClose={() => setIsCommentOpen(false)} />}
    </div>
  );
};

export default VideoPlayer;
