import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IssueFilters, { issueStates, sortOrders } from "./IssueFilters";

describe("<IssueFilters />", () => {
  it("should call onStateChange with the correct value", () => {
    const handleStateChange = jest.fn();

    render(<IssueFilters onStateChange={handleStateChange} />);

    issueStates.forEach((state) => {
      userEvent.selectOptions(screen.getByLabelText(/state/i), state);

      expect(handleStateChange).toHaveBeenCalledTimes(1);
      expect(handleStateChange).toHaveBeenCalledWith(state);

      handleStateChange.mockClear();
    });
  });

  it("should call onSortOrderChange with the correct value", () => {
    const handleSortOrderChange = jest.fn();

    render(<IssueFilters onSortOrderChange={handleSortOrderChange} />);

    sortOrders.forEach((sortOrder, index) => {
      userEvent.selectOptions(screen.getByLabelText(/sort/i), String(index));

      expect(handleSortOrderChange).toHaveBeenCalledTimes(1);
      expect(handleSortOrderChange).toHaveBeenCalledWith(
        sortOrder.field,
        sortOrder.direction
      );

      handleSortOrderChange.mockClear();
    });
  });
});
