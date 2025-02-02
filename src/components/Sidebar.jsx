import React, { useState } from "react";
import {
  FaHome,
  FaRegClock,
  FaRegHeart,
  FaVideo,
  FaHistory,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";
import {
  MdSubscriptions,
  MdOutlineShortText,
  MdOutlineWatchLater,
  MdTrendingUp,
  MdOutlineLiveTv,
  MdOutlineFeedback,
} from "react-icons/md";
import { IoMusicalNotes, IoHelpCircleOutline } from "react-icons/io5";
import { useSidebar } from "../components/SidebarContext";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const { isCollapsed } = useSidebar();
  // Sample subscriptions with icons
  const subscriptions = [
    { name: "Channel 1", icon: <FaUserCircle /> },
    { name: "Channel 2", icon: <FaUserCircle /> },
    { name: "Channel 3", icon: <FaUserCircle /> },
    { name: "Channel 4", icon: <FaUserCircle /> },
    { name: "Channel 5", icon: <FaUserCircle /> },
  ];

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <ul>
        {/* Main Navigation */}
        <li>
          <FaHome className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Home"}
        </li>
        <li>
          <MdOutlineShortText className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Shorts"}
        </li>
        <li>
          <MdSubscriptions className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Subscriptions"}
        </li>
        <hr />

        {/* You Section */}
        {!isCollapsed && <li className={styles.sectionHeader}>You</li>}
        <li>
          <FaHistory className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "History"}
        </li>
        <li>
          <FaRegClock className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Playlists"}
        </li>
        <li>
          <FaVideo className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Your videos"}
        </li>
        <li>
          <MdOutlineWatchLater className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Watch later"}
        </li>
        <li>
          <FaRegHeart className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Liked videos"}
        </li>
        <hr />

        {/* Subscriptions Section */}
        {!isCollapsed && <li className={styles.sectionHeader}>Subscriptions</li>}
        {subscriptions.map((channel, index) => (
          <li key={index} className={styles.subscription}>
            <span className={styles.icon}>{channel.icon}</span>
            {!isCollapsed && <span>{channel.name}</span>}
          </li>
        ))}
        <hr />

        {/* Explore Section */}
        {!isCollapsed && <li className={styles.sectionHeader}>Explore</li>}
        <li>
          <MdTrendingUp className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Trending"}
        </li>
        <li>
          <IoMusicalNotes className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Music"}
        </li>
        <li>
          <MdOutlineLiveTv className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Live"}
        </li>
        <hr />

        {/* More from YouTube Section */}
        {!isCollapsed && <li className={styles.sectionHeader}>More from YouTube</li>}
        <li>
          <MdSubscriptions className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "YouTube Premium"}
        </li>
        <li>
          <FaVideo className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "YouTube Studio"}
        </li>
        <hr />

        {/* Settings Section */}
        <li>
          <FaCog className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Settings"}
        </li>
        <li>
          <IoHelpCircleOutline className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Help"}
        </li>
        <li>
          <MdOutlineFeedback className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ""}`} />
          {!isCollapsed && "Send feedback"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
