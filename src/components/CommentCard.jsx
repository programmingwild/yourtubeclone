import React from "react";
import { IoIosPerson } from "react-icons/io";
import styles from "../styles/CommentCard.module.css";

const CommentCard = ({ comment }) => {
  return (
    <div className={styles.commentCard}>
      <IoIosPerson className={styles.commentUserIcon} />
      <div className={styles.commentContent}>
        <p className={styles.userName}>{comment.user}</p>
        <p className={styles.comment}>{comment.comment}</p>
        <p className={styles.timestamp}>{comment.timestamp}</p>
      </div>
    </div>
  );
};

export default CommentCard;
