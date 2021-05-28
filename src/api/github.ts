import { Issue, IssueOrderField, IssueState, OrderDirection } from "../types";
import { getPagesFromLinkHeader } from "./utils";

const GITHUB_APIKEY = "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";

/**
 * Fetches GitHub issues for a given organization and repository.
 *
 * @param organization - An organization on GitHub
 * @param repository - An organization's repository
 * @param orderField - The field to sort by
 * @param orderDirection - The sort direction: asc or desc
 * @param page - Page number of the results to fetch
 * @param issuesPerPage - Number of issues to fetch (max 100)
 * @returns A list of issues
 */
export const fetchGithubIssues = (
  organization: string,
  repository: string,
  state: IssueState,
  orderField: IssueOrderField,
  orderDirection: OrderDirection,
  currentPage: number,
  issuesPerPage: number = 30
): Promise<{ issues: Issue[]; pages: number }> => {
  return fetch(
    `https://api.github.com/repos/${organization}/${repository}/issues?per_page=${issuesPerPage}&page=${currentPage}&state=${state}&direction=${orderDirection}&sort=${orderField}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_APIKEY}`,
      },
    }
  ).then(async (res) => {
    if (res.status >= 400) {
      return Promise.reject(await res.json());
    }

    const link = res.headers.get("link") || "";
    const pages = getPagesFromLinkHeader(link, currentPage);

    return {
      issues: await res.json(),
      pages,
    };
  });
};
