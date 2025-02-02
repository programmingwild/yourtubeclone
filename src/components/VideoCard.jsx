import React from "react";
import styles from "../styles/VideoCard.module.css";

const VideoCard = ({ title, channel, views, thumbnail }) => {
  return (
    <div className={styles.videoCard}>
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
