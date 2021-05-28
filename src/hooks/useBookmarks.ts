import React from "react";
import { Issue } from "../types";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState<Issue[]>([]);

  const isBookmarked = React.useCallback(
    (issue: Issue) => {
      return (
        bookmarks.find((bookmark) => bookmark.id === issue.id) !== undefined
      );
    },
    [bookmarks]
  );

  const toggleBookmark = React.useCallback(
    (issue: Issue) => {
      setBookmarks((bookmarks) => {
        const newBookmarks = isBookmarked(issue)
          ? bookmarks.filter((bookmark) => bookmark.id !== issue.id)
          : [...bookmarks, issue];
        localStorage.setItem(`bookmarkedIssues`, JSON.stringify(newBookmarks));
        return newBookmarks;
      });
    },
    [isBookmarked]
  );

  React.useEffect(() => {
    const item = localStorage.getItem(`bookmarkedIssues`);

    if (item === null) {
      setBookmarks([]);
    } else {
      setBookmarks(JSON.parse(item));
    }
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark };
};

export default useBookmarks;
