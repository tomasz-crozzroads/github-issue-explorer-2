import React from "react";
import { ReactComponent as StarFilled } from "../../assets/star-filled.svg";
import { ReactComponent as StarOutlined } from "../../assets/star-outlined.svg";
import styles from "./BookmarkButton.module.css";

export interface BookmarkButtonProps {
  checked: boolean;
  onToggle?: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  checked,
  onToggle,
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    if (onToggle) {
      e.stopPropagation();
      onToggle();
    }
  };

  return (
    <button
      className={`${styles.button} ${onToggle && styles.clickable}`}
      onClick={handleToggle}
    >
      {checked ? (
        <StarFilled className={styles.checked} />
      ) : (
        <StarOutlined className={styles.unchecked} />
      )}
    </button>
  );
};

export default BookmarkButton;
