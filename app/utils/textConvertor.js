export const parseHtmlList = (html = "") => {
  if (typeof html !== "string") return [];

  return html
    .replace(/&nbsp;/gi, "")
    .split(/<\/p>|<\/li>/i)
    .map((item) =>
      item
        .replace(/<p>/gi, "")
        .replace(/<li>/gi, "")
        .replace(/<\/?strong>/gi, "")
        .replace(/<br\s*\/?>/gi, "")
        .trim()
    )
    .filter(
      (item) =>
        item &&
        item !== "" &&
        item !== "<p>" &&
        item !== "</p>"
    );
};