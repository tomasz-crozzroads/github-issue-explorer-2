import { Issue } from "../../types";
import BookmarkButton from "../BookmarkButton";
import styles from "./IssueItem.module.css";

export interface IssueItemProps {
  bookmarked?: boolean;
  issue: Issue;
  onToggleBookmark?: (issue: Issue) => void;
}

const IssueItem: React.FC<IssueItemProps> = ({
  bookmarked = false,
  issue,
  onToggleBookmark,
}) => {
  const handleToggle = () => {
    onToggleBookmark && onToggleBookmark(issue);
  };

  return (
    <div className={styles.item}>
      <BookmarkButton
        checked={bookmarked}
        onToggle={onToggleBookmark && handleToggle}
      />
      <h1 className={styles.title}>{issue.title}</h1>
      <p className={styles.owner}>
        Author: <span>{issue.user.login}</span>
      </p>
      <p className={styles.created}>
        Created: <span>{new Date(issue.created_at).toLocaleDateString()}</span>
      </p>
      <p className={styles.updated}>
        Updated: <span>{new Date(issue.updated_at).toLocaleDateString()}</span>
      </p>
      <p className={styles.comments}>
        Comments: <span>{issue.comments}</span>
      </p>
      <p className={styles.message}>Message:</p>
      <textarea
        className={styles.body}
        data-testid="issue-body"
        disabled
        value={issue.body}
      />
    </div>
  );
};

export default IssueItem;
