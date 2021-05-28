import { ReactComponent as IssueClosed } from "../../assets/closed.svg";
import { ReactComponent as Comment } from "../../assets/comment.svg";
import { ReactComponent as IssueOpen } from "../../assets/open.svg";
import { Issue } from "../../types";
import BookmarkButton from "../BookmarkButton";
import styles from "./IssueListItem.module.css";

export interface IssueListItemProps {
  bookmarked?: boolean;
  issue: Issue;
  onClick: (issue: Issue) => void;
  onToggleBookmark?: (issue: Issue) => void;
}

const IssueListItem: React.FC<IssueListItemProps> = ({
  bookmarked = false,
  issue,
  onClick,
  onToggleBookmark,
}) => {
  const handleClick = () => {
    onClick(issue);
  };

  const handleToggle = () => {
    onToggleBookmark && onToggleBookmark(issue);
  };

  return (
    <li className={styles.listitem} onClick={handleClick}>
      <span className={styles.state}>
        {issue.state === "closed" ? (
          <IssueClosed className={styles.closed} />
        ) : (
          <IssueOpen className={styles.open} />
        )}
      </span>
      <span className={styles.info}>
        <span className={styles.title}>{issue.title}</span>
        <span className={styles.subTitle}>
          #<span className={styles.number}>{issue.number}</span> opened on{" "}
          <span className={styles.created_at}>
            {new Date(issue.created_at).toLocaleDateString()}
          </span>{" "}
          by <span className={styles.login}>{issue.user.login}</span>
        </span>
      </span>
      {issue.comments > 0 && (
        <span className={styles.comments}>
          <Comment style={{ marginRight: 4 }} /> {issue.comments}
        </span>
      )}
      <span className={styles.bookmarked}>
        <BookmarkButton
          checked={bookmarked}
          onToggle={onToggleBookmark && handleToggle}
        />
      </span>
    </li>
  );
};

export default IssueListItem;
