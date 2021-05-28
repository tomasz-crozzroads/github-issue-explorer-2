import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Issue } from "../../types";
import IssueItem from "./IssueItem";

const issue: Issue = {
  html_url: "https://github.com/facebook/react/pull/200",
  id: 16846209,
  number: 200,
  title: "Add React.version",
  user: {
    login: "sophiebits",
  },
  state: "closed",
  comments: 3,
  created_at: "2013-07-17T03:41:15Z",
  updated_at: "2013-09-10T00:01:12Z",
  pull_request: {
    url: "https://api.github.com/repos/facebook/react/pulls/200",
  },
  body: "getConfig needs to be a function because grunt.config.data.pkg.version isn't available at the time that grunt/config/jsx/jsx.js is required.\n\nTest Plan:\ngrunt build, grunt lint, grunt test all work. After building, both react.js and react.min.js contain the version number.\n",
};

describe("<IssueItem />", () => {
  it("should render issue data", () => {
    render(<IssueItem issue={issue} />);

    expect(screen.getByText(issue.user.login)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(issue.created_at).toLocaleDateString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(new Date(issue.updated_at).toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText(issue.comments)).toBeInTheDocument();
    expect(screen.getByTestId("issue-body")).toHaveValue(issue.body);
  });

  it("should render correct issue bookmark status", () => {
    let result = render(<IssueItem issue={issue} />);

    let container = result.container;

    expect(container.querySelector(".checked")).toBeNull();
    expect(container.querySelector(".unchecked")).toBeInTheDocument();

    result = render(<IssueItem bookmarked={true} issue={issue} />);

    container = result.container;

    expect(container.querySelector(".checked")).toBeInTheDocument();
    expect(container.querySelector(".unchecked")).toBeNull();
  });
});
