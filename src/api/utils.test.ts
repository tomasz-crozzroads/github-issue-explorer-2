import { getPagesFromLinkHeader } from "./utils";

const linkHeader1 =
  '<https://api.github.com/repositories/10270250/issues?per_page=30&page=704&state=all>; rel="prev", <https://api.github.com/repositories/10270250/issues?per_page=30&page=706&state=all>; rel="next", <https://api.github.com/repositories/10270250/issues?per_page=30&page=711&state=all>; rel="last", <https://api.github.com/repositories/10270250/issues?per_page=30&page=1&state=all>; rel="first"';

const linkHeader2 =
  '<https://api.github.com/repositories/29028775/issues?per_page=30&page=704&state=all>; rel="prev", <https://api.github.com/repositories/29028775/issues?per_page=30&page=706&state=all>; rel="next", <https://api.github.com/repositories/29028775/issues?per_page=30&page=1047&state=all>; rel="last", <https://api.github.com/repositories/29028775/issues?per_page=30&page=1&state=all>; rel="first"';

describe("getPagesFromLinkHeader()", () => {
  it("should return the correct page count", () => {
    let pages = getPagesFromLinkHeader(linkHeader1, 1);

    expect(pages).toBe(711);

    pages = getPagesFromLinkHeader(linkHeader2, 1);

    expect(pages).toBe(1047);
  });
});
