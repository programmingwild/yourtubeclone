import React from "react";
import styles from "../styles/VideoCard.module.css";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ title, channel, views, thumbnail, onClick, video }) => {

  const navigate = useNavigate();
    const handleVideoClick = () => {
    navigate(`/watch/${video.id}`, { state: { video } });
  };

  return (
    <div className={styles.videoCard} onClick={onClick}>
      <img src={thumbnail} alt={title} className={styles.thumbnail} />
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.channel}>{channel}</p>
        <p className={styles.views}>{views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;