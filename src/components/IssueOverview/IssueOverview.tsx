import React from "react";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import useBookmarks from "../../hooks/useBookmarks";
import {
  FetchStatus,
  useFetchGithubIssues,
} from "../../hooks/useFetchGithubIssues";
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
import RepoForm from "../RepoForm";
import styles from "./IssueOverview.module.css";

export interface IssueOverviewProps {}

const IssueOverview: React.FC<IssueOverviewProps> = () => {
  const [organization, setOrganization] = React.useState("");
  const [repository, setRepository] = React.useState("");

  const [orderDirection, setOrderDirection] =
    React.useState<OrderDirection>("desc");
  const [orderField, setOrderField] =
    React.useState<IssueOrderField>("created");
  const [state, setState] = React.useState<IssueState>("all");

  const [activeIssue, setActiveIssue] = React.useState<Issue | null>(null);
  const [currentPage, setCurrentPage] = React.useState(0);

  const { isBookmarked, toggleBookmark } = useBookmarks();

  const { error, fetchStatus, issues, pages } = useFetchGithubIssues(
    organization,
    repository,
    state,
    orderField,
    orderDirection,
    currentPage
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

  const handleSubmit = (organization: string, repository: string) => {
    setOrganization(organization);
    setRepository(repository);
  };

  const handleToggleBookmark = (issue: Issue) => {
    toggleBookmark(issue);
  };

  return (
    <div data-testid="issue-overview">
      <div className={styles.form}>
        <RepoForm onSubmit={handleSubmit} />
        <IssueFilters
          initialValues={{
            state,
            field: orderField,
            direction: orderDirection,
          }}
          onSortOrderChange={handleSortOrderChange}
          onStateChange={handleStateChange}
        />
      </div>
      <div className={styles.overview}>
        {fetchStatus === FetchStatus.Error && (
          <div className={styles.container}>
            <p>Failed loading issues: {error}</p>
          </div>
        )}
        {fetchStatus === FetchStatus.Fetching && (
          <div className={styles.container}>
            <Spinner style={{ transform: "scaleX(-1)" }} />
          </div>
        )}
        {fetchStatus === FetchStatus.Fetched && (
          <>
            <div className={styles.list}>
              <IssueList
                isBookmarked={isBookmarked}
                issues={issues}
                onClick={handleIssueClick}
                onToggleBookmark={handleToggleBookmark}
              />
              <Pagination
                onPageChange={setCurrentPage}
                page={currentPage}
                pages={pages}
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
          </>
        )}
      </div>
    </div>
  );
};

export default IssueOverview;
