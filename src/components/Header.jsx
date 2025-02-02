import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosPerson } from "react-icons/io";
import UserAccount from "./UserAccount";
import "../../src/index.css";
import styles from "../styles/Header.module.css";
import { useSidebar } from "../components/SidebarContext";
import SearchResult from "./SearchResult";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleUserIconClick = () => {
    setShowUserAccount(!showUserAccount); // Toggle visibility
  };

  const closeUserAccount = () => {
    setShowUserAccount(false); // Close the popup
  };



  const handleSearch = () => {
    const dummyResults = [
      {
        title: "React.js Tutorial for Beginners",
        channel: "CodeAcademy",
        thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Learn Redux in 10 Minutes",
        channel: "TechSavvy",
        thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];

    const filteredResults = dummyResults.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Collapsible Sidebar Icon */}
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <FaBars className={styles.icon} />
        </button>

        {/* YouTube Logo */}
        <div className={styles.logo}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className={styles.logoImage}
          />
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <AiOutlineSearch className={styles.searchIcon} />
          </button>
        </div>

        {/* User Circle (Profile Icon) */}
        <div className={styles.userProfile}>
          <IoIosPerson
            className={styles.userIcon}
            onClick={handleUserIconClick} // Toggle popup
          />
        </div>
      </header>

      {/* UserAccount Popup */}
      {showUserAccount && (
        <div className={styles.popupBackdrop} onClick={closeUserAccount}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <UserAccount />
          </div>
        </div>
      )}

      {searchTerm && <SearchResult results={results} />}
    </>
  );
};

export default Header;
