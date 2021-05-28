import { Issue } from "../../types";
import { sortBookmarks } from "./utils";

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

describe("sortBookmarks()", () => {
  it("should order bookmarks correctly", () => {
    issues.sort(sortBookmarks("asc", "created"));
    expect(issues[0].created_at).toBe("2013-07-16T21:22:52Z");

    issues.sort(sortBookmarks("desc", "created"));
    expect(issues[0].created_at).toBe("2013-07-17T03:41:15Z");

    issues.sort(sortBookmarks("asc", "updated"));
    expect(issues[0].updated_at).toBe("2013-07-18T03:42:37Z");

    issues.sort(sortBookmarks("desc", "updated"));
    expect(issues[0].updated_at).toBe("2013-10-28T22:51:44Z");

    issues.sort(sortBookmarks("asc", "comments"));
    expect(issues[0].comments).toBe(0);

    issues.sort(sortBookmarks("desc", "comments"));
    expect(issues[0].comments).toBe(3);
  });
});
