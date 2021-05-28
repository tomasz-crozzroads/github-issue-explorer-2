import React from "react";
import { fetchGithubIssues } from "../api/github";
import { Issue, IssueOrderField, IssueState, OrderDirection } from "../types";

export enum FetchStatus {
  Idle,
  Fetching,
  Fetched,
  Error,
}

export const useFetchGithubIssues = (
  organization: string,
  repository: string,
  state: IssueState,
  orderField: IssueOrderField,
  orderDirection: OrderDirection,
  page: number
) => {
  const [error, setError] = React.useState("");
  const [fetchStatus, setFetchStatus] = React.useState(FetchStatus.Idle);
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const [pages, setPages] = React.useState(1);

  React.useEffect(() => {
    let active = false;

    if (organization && repository) {
      setFetchStatus(FetchStatus.Fetching);

      (async () => {
        active = true;

        await fetchGithubIssues(
          organization,
          repository,
          state,
          orderField,
          orderDirection,
          page
        )
          .then((res) => {
            if (active) {
              setIssues(res.issues);
              setPages(res.pages);
              setFetchStatus(FetchStatus.Fetched);
            }
          })
          .catch((error) => {
            if (active) {
              setError(error.message);
              setFetchStatus(FetchStatus.Error);
            }
          });
      })();
    }

    return () => {
      active = false;
    };
  }, [organization, repository, state, orderField, orderDirection, page]);

  return { error, fetchStatus, issues, pages };
};
