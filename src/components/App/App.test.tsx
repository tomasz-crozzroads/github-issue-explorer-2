import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("<App />", () => {
  it("initially renders issue overview", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("issue-overview")).toBeInTheDocument();
  });

  it("navigates to correct route", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("link", { name: /bookmarks/i }));

    expect(screen.getByTestId("bookmark-overview")).toBeInTheDocument();

    userEvent.click(screen.getByRole("link", { name: /issues/i }));

    expect(screen.getByTestId("issue-overview")).toBeInTheDocument();
  });
});
