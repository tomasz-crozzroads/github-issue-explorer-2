import { renderHook } from "@testing-library/react-hooks";
import { Issue, IssueOrderField, IssueState, OrderDirection } from "../types";
import { FetchStatus, useFetchGithubIssues } from "./useFetchGithubIssues";

const linkHeader =
  '<https://api.github.com/repositories/10270250/issues?per_page=30&page=704&state=all>; rel="prev", <https://api.github.com/repositories/10270250/issues?per_page=30&page=706&state=all>; rel="next", <https://api.github.com/repositories/10270250/issues?per_page=30&page=711&state=all>; rel="last", <https://api.github.com/repositories/10270250/issues?per_page=30&page=1&state=all>; rel="first"';

const issues: Issue[] = [
  {
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
  },
  {
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
  },
  {
    html_url: "https://github.com/facebook/react/issues/198",
    id: 16839048,
    number: 198,
    title: "Few issues in the (upcoming) doc",
    user: {
      login: "chenglou",
    },
    state: "closed",
    comments: 1,
    created_at: "2013-07-16T22:59:57Z",
    updated_at: "2013-10-28T22:51:44Z",
    body: "Seems to be a busy day, but I'd like to drop some notes on what I've seen from the next documentation:\n- Like I said, would be nice to have a mention of css-ing with `style` key, and some integration within existing/new examples.\n- DOM differences should include CSS camelCasing and a link toward the form section (with the new `defaultValue` and all).\n- The part on DOM differences is currently in the reference section and is not obvious enough imo.\n- Self-closing tags are always ok in React (?), even on elements you wouldn't normally self-close: `<span />`, `<div />`. Although this might be in DOM differences, since it applies to every React component, it should probably be mentioned elsewhere. E.g. it's obvious now that `<Hello />` is possible, but it's actually not mentioned (unless I missed it) that `<Hello>hi</Hello>` is also valid, and that what's inside goes into `props.children`.\n",
  },
  {
    html_url: "https://github.com/facebook/react/pull/197",
    id: 16834741,
    number: 197,
    title: "Safely silence console messages by spying on console.{warn,error}",
    user: {
      login: "benjamn",
    },
    state: "closed",
    comments: 2,
    created_at: "2013-07-16T21:22:52Z",
    updated_at: "2013-07-18T03:42:37Z",
    pull_request: {
      url: "https://api.github.com/repos/facebook/react/pulls/197",
    },
    body: "This eliminates _all_ spurious console messages in `grunt test`, thanks to a great suggestion from @petehunt.\n",
  },
];

beforeAll(() => jest.spyOn(window, "fetch"));

const mockFetch = async (url: string) => {
  if (url.startsWith("https://api.github.com/repos/facebook/react")) {
    return {
      headers: {
        get: () => linkHeader,
      },
      ok: true,
      status: 200,
      json: async () => issues,
    };
  }

  return {
    ok: false,
    status: 404,
    json: async () => ({
      message: "Not Found",
    }),
  };
};

// @ts-ignore
beforeEach(() => window.fetch.mockImplementation(mockFetch));

describe("useFetchGithubIssues()", () => {
  const render = (
    organization: string,
    repository: string,
    state: IssueState,
    orderField: IssueOrderField,
    orderDirection: OrderDirection,
    page: number
  ) => {
    return renderHook(() =>
      useFetchGithubIssues(
        organization,
        repository,
        state,
        orderField,
        orderDirection,
        page
      )
    );
  };

  it("should return fetch status, issues, page count", async () => {
    const { result, waitForNextUpdate } = render(
      "facebook",
      "react",
      "all",
      "created",
      "desc",
      1
    );

    expect(result.current.fetchStatus).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("");
    expect(result.current.fetchStatus).toEqual(FetchStatus.Fetched);
    expect(result.current.issues).toHaveLength(4);
    expect(result.current.pages).toBe(711);
  });

  it("should return an error", async () => {
    const { result, waitForNextUpdate } = render(
      "facebook",
      "xxx",
      "all",
      "created",
      "desc",
      1
    );

    expect(result.current.fetchStatus).toEqual(FetchStatus.Fetching);

    await waitForNextUpdate();

    expect(result.current.error).toEqual("Not Found");
    expect(result.current.fetchStatus).toEqual(FetchStatus.Error);
    expect(result.current.issues).toHaveLength(0);
    expect(result.current.pages).toBe(1);
  });
});
