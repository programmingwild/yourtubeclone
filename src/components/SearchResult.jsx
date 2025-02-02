import React from "react";
import styles from "../styles/SearchResult.module.css";

const SearchResult = ({ results }) => {
  return (
    <div className={styles.searchResult}>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className={styles.resultCard}>
            <img
              src={result.thumbnail}
              alt={result.title}
              className={styles.thumbnail}
            />
            <div className={styles.resultDetails}>
              <h3 className={styles.title}>{result.title}</h3>
              <p className={styles.channel}>{result.channel}</p>
              <p className={styles.description}>{result.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noResult}>No results found. Try a different search.</p>
      )}
    </div>
  );
};

export default SearchResult;
