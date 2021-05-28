export const getPagesFromLinkHeader = (
  link: string,
  currentPage: number = 1
) => {
  const linkPageInfo = link
    .split(",")
    .map((line) => {
      let [url, rel] = line.split(";");

      url = url.trim();
      url = url.substr(1, url.length - 2);

      let u = new URL(url);
      const page = u.searchParams.get("page");

      let match = rel.match(/"(.*)"/);
      rel = match !== null ? match[1] : "";

      return { [rel]: Number(page) };
    })
    .reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        ...currentValue,
      }),
      { first: 1, last: currentPage, prev: undefined, next: undefined }
    );

  return linkPageInfo.last;
};
