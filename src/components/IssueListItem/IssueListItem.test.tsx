import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Issue } from "../../types";
import IssueListItem from "./IssueListItem";

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

const issue2: Issue = {
  html_url: "https://github.com/facebook/react/pull/199",
  id: 16843795,
  number: 199,
  title: "Tweaked the intro page",
  user: {
    login: "chenglou",
  },
  state: "open",
  comments: 0,
  created_at: "2013-07-17T01:40:14Z",
  updated_at: "2013-08-16T20:56:49Z",
  pull_request: {
    url: "https://api.github.com/repos/facebook/react/pulls/199",
  },
  body: 'Here are some ideas that I think work better:\n- 15 repetitions of "React" lol. Removed a few.\n- The "two main ideas" weren\'t clearly separated. I put them under different headers and simplified the wording.\n- The "Give it Five Minutes section didn\'t sound as reassuring. Made it sound more certain and "experienced".\n',
};

describe("<IssueItem />", () => {
  it("should render correct issue state", () => {
    let result = render(<IssueListItem issue={issue} onClick={() => {}} />);

    let container = result.container;

    expect(container.querySelector(".closed")).toBeInTheDocument();
    expect(container.querySelector(".open")).toBeNull();

    result = render(<IssueListItem issue={issue2} onClick={() => {}} />);

    container = result.container;

    expect(container.querySelector(".closed")).toBeNull();
    expect(container.querySelector(".open")).toBeInTheDocument();
  });

  it("should render title, number, and creation date", () => {
    render(<IssueListItem issue={issue} onClick={() => {}} />);

    expect(screen.getByText(issue.title)).toBeInTheDocument();
    expect(screen.getByText(issue.number)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(issue.created_at).toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("should render comments if present", () => {
    let result = render(<IssueListItem issue={issue} onClick={() => {}} />);

    let container = result.container;

    expect(container.querySelector(".comments")).toBeInTheDocument();
    expect(screen.getByText(issue.comments)).toBeInTheDocument();

    result = render(<IssueListItem issue={issue2} onClick={() => {}} />);

    container = result.container;

    expect(container.querySelector(".comments")).toBeNull();
  });

  it("should render correct bookmark status", () => {
    let result = render(
      <IssueListItem bookmarked={false} issue={issue} onClick={() => {}} />
    );

    let container = result.container;

    expect(container.querySelector(".checked")).toBeNull();
    expect(container.querySelector(".unchecked")).toBeInTheDocument();

    result = render(
      <IssueListItem bookmarked={true} issue={issue} onClick={() => {}} />
    );

    container = result.container;

    expect(container.querySelector(".checked")).toBeInTheDocument();
    expect(container.querySelector(".unchecked")).toBeNull();
  });

  it("should call onClick on click", () => {
    const handleClick = jest.fn();

    render(<IssueListItem issue={issue} onClick={handleClick} />);

    userEvent.click(screen.getByRole("listitem"));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(issue);
  });

  it("should call onToggleBookmark on bookmark click", () => {
    const handleClick = jest.fn();
    const handleToggleBookmark = jest.fn();

    render(
      <IssueListItem
        issue={issue}
        onClick={handleClick}
        onToggleBookmark={handleToggleBookmark}
      />
    );

    userEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(handleToggleBookmark).toHaveBeenCalledTimes(1);
    expect(handleToggleBookmark).toHaveBeenCalledWith(issue);
  });
});
