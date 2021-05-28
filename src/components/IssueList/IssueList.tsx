import { Issue } from "../../types";
import IssueListItem from "../IssueListItem";
import styles from "./IssueList.module.css";

export interface IssueListProps {
  isBookmarked?: (issue: Issue) => boolean;
  issues: Issue[];
  onClick: (issue: Issue) => void;
  onToggleBookmark?: (issue: Issue) => void;
}

const IssueList: React.FC<IssueListProps> = ({
  isBookmarked = () => false,
  issues,
  onClick,
  onToggleBookmark,
}) => {
  const handleClick = (issue: Issue) => {
    onClick(issue);
  };

  const handleToggle = (issue: Issue) => {
    onToggleBookmark && onToggleBookmark(issue);
  };

  return (
    <ul className={styles.list}>
      {issues.map((issue) => (
        <IssueListItem
          bookmarked={isBookmarked(issue)}
          issue={issue}
          key={issue.id}
          onClick={handleClick}
          onToggleBookmark={onToggleBookmark && handleToggle}
        />
      ))}
    </ul>
  );
};

export default IssueList;
