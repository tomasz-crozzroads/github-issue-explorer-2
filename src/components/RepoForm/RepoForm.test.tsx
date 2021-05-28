import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RepoForm from "./RepoForm";

describe("<RepoForm />", () => {
  it("should not call onSubmit", () => {
    const handleSubmit = jest.fn();

    render(<RepoForm onSubmit={handleSubmit} />);

    userEvent.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it("should call onSubmit with the correct values", () => {
    const handleSubmit = jest.fn();

    render(<RepoForm onSubmit={handleSubmit} />);

    userEvent.type(screen.getByLabelText(/organization/i), "facebook");
    userEvent.type(screen.getByLabelText(/repository/i), "react");
    userEvent.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith("facebook", "react");
  });
});
