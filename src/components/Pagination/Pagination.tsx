import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pages,
  onPageChange,
}) => {
  const paginationItems = React.useMemo(() => {
    if (pages <= 9) {
      return Array.from({ length: pages }, (_, i) => i);
    }

    let result: (string | number)[] = [0, 1, 2];

    if (page > 3) {
      result.push("…");
    }

    if (page > 2 && page < pages - 3) {
      result.push(page);
    }

    if (page < pages - 4) {
      result.push("…");
    }

    result = [...result, pages - 3, pages - 2, pages - 1];

    return result;
  }, [page, pages]);

  if (pages === 1) {
    return null;
  }

  return (
    <nav className={styles.navigation}>
      <ul className={styles.listbox}>
        <li
          className={
            styles.listitem + (page === 0 ? " " + styles.disabled : "")
          }
          onClick={page === 0 ? undefined : () => onPageChange(page - 1)}
        >
          &lt;
        </li>
        {paginationItems.map((item, index) => (
          <li
            className={
              styles.listitem +
              (item === page
                ? " " + styles.active
                : item === "…"
                ? " " + styles.ellipsis
                : "")
            }
            key={index}
            onClick={
              item !== "…" ? () => onPageChange(item as number) : undefined
            }
          >
            {item !== "…" ? +item + 1 : item}
          </li>
        ))}
        <li
          className={
            styles.listitem + (page === pages - 1 ? " " + styles.disabled : "")
          }
          onClick={
            page === pages - 1 ? undefined : () => onPageChange(page + 1)
          }
        >
          &gt;
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
