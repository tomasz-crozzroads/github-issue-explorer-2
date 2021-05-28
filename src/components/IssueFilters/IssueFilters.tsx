import React from "react";
import { IssueOrderField, IssueState, OrderDirection } from "../../types";
import styles from "./IssueFilters.module.css";

export interface IssueFiltersProps {
  initialValues?: {
    state?: IssueState;
    field?: IssueOrderField;
    direction?: OrderDirection;
  };
  onSortOrderChange?: (
    field: IssueOrderField,
    direction: OrderDirection
  ) => void;
  onStateChange?: (state: IssueState) => void;
}

export interface SortOrder {
  name: string;
  field: IssueOrderField;
  direction: OrderDirection;
}

export const issueStates: IssueState[] = ["closed", "open", "all"];

export const sortOrders: SortOrder[] = [
  { name: "newest", field: "created", direction: "desc" },
  { name: "oldest", field: "created", direction: "asc" },
  { name: "most commented", field: "comments", direction: "desc" },
  { name: "least commented", field: "comments", direction: "asc" },
  { name: "recently updated", field: "updated", direction: "desc" },
  { name: "least recently updated", field: "updated", direction: "asc" },
];

const IssueFilters: React.FC<IssueFiltersProps> = ({
  initialValues,
  onSortOrderChange,
  onStateChange,
}) => {
  const [sortOrder, setSortOrder] = React.useState(() => {
    const index = sortOrders.findIndex(
      (sortOrder) =>
        sortOrder.field === initialValues?.field &&
        sortOrder.direction === initialValues?.direction
    );
    return index === -1 ? "0" : String(index);
  });
  const [state, setState] = React.useState<IssueState>(
    initialValues?.state || "all"
  );

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.currentTarget.value);
    const sortOrder = sortOrders[Number(e.currentTarget.value)];
    onSortOrderChange &&
      onSortOrderChange(sortOrder.field, sortOrder.direction);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.currentTarget.value as IssueState;
    setState(state);
    onStateChange && onStateChange(state);
  };

  return (
    <div className={styles.filters}>
      {onStateChange && (
        <div className={styles.field}>
          <label htmlFor="state">State:</label>
          <select id="state" value={state} onChange={handleStateChange}>
            {issueStates.map((state, index) => (
              <option key={index}>{state}</option>
            ))}
          </select>
        </div>
      )}

      {onSortOrderChange && (
        <div className={styles.field}>
          <label htmlFor="sortOrder">Sort:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            {sortOrders.map((sortOrder, index) => (
              <option key={index} value={index}>
                {sortOrder.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default IssueFilters;
