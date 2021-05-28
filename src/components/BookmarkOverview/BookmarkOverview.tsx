import React from "react";
import useBookmarks from "../../hooks/useBookmarks";
import {
  Issue,
  IssueOrderField,
  IssueState,
  OrderDirection,
} from "../../types";
import IssueFilters from "../IssueFilters/IssueFilters";
import IssueItem from "../IssueItem";
import IssueList from "../IssueList";
import Pagination from "../Pagination";
import styles from "./BookmarkOverview.module.css";
import { sortBookmarks } from "./utils";

export interface BookmarkOverviewProps {}

const BookmarkOverview: React.FC<BookmarkOverviewProps> = () => {
  const [orderDirection, setOrderDirection] =
    React.useState<OrderDirection>("desc");
  const [orderField, setOrderField] =
    React.useState<IssueOrderField>("created");
  const [state, setState] = React.useState<IssueState>("all");

  const [activeIssue, setActiveIssue] = React.useState<Issue | null>(null);
  const [currentPage, setCurrentPage] = React.useState(0);

  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const orderedBookmarks = React.useMemo(
    () =>
      bookmarks
        .filter((bookmark) => state === "all" || bookmark.state === state)
        .sort(sortBookmarks(orderDirection, orderField)),
    [bookmarks, orderDirection, orderField, state]
  );

  const handleIssueClick = (issue: Issue) => {
    setActiveIssue(issue);
  };

  const handleSortOrderChange = (
    field: IssueOrderField,
    direction: OrderDirection
  ) => {
    setOrderDirection(direction);
    setOrderField(field);
  };

  const handleStateChange = (state: IssueState) => {
    setState(state);
  };

  const handleToggleBookmark = (issue: Issue) => {
    toggleBookmark(issue);
  };

  return (
    <div data-testid="bookmark-overview">
      <IssueFilters
        initialValues={{ state, field: orderField, direction: orderDirection }}
        onSortOrderChange={handleSortOrderChange}
        onStateChange={handleStateChange}
      />
      <div className={styles.overview}>
        <div className={styles.list}>
          <IssueList
            isBookmarked={isBookmarked}
            issues={orderedBookmarks}
            onClick={handleIssueClick}
            onToggleBookmark={handleToggleBookmark}
          />
          <Pagination
            onPageChange={setCurrentPage}
            page={currentPage}
            pages={Math.ceil(bookmarks.length / 30)}
          />
        </div>
        {activeIssue && (
          <div className={styles.details}>
            <IssueItem
              bookmarked={isBookmarked(activeIssue)}
              issue={activeIssue}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkOverview;
