import { Issue, IssueOrderField, OrderDirection } from "../../types";

/**
 * Returns a function that sorts a list of issues.
 *
 * @param orderDirection - The direction of sorting
 * @param orderField - The field to sort by
 * @returns A function sort a list of issues
 */
export const sortBookmarks =
  (orderDirection: OrderDirection, orderField: IssueOrderField) =>
  (a: Issue, b: Issue) => {
    const order = orderDirection === "desc" ? -1 : 1;

    if (orderField === "created") {
      if (a.created_at > b.created_at) {
        return order;
      } else if (a.created_at === b.created_at) {
        return 0;
      }

      return -1 * order;
    }

    if (orderField === "updated") {
      if (a.updated_at > b.updated_at) {
        return order;
      } else if (a.updated_at === b.updated_at) {
        return 0;
      }

      return -1 * order;
    }

    if (orderField === "comments") {
      if (a.comments > b.comments) {
        return order;
      } else if (a.comments === b.comments) {
        return 0;
      }

      return -1 * order;
    }

    return 0;
  };
