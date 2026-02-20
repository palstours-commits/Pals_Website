export const parseHtmlList = (html = "") => {
  if (!html) return [];

  return html
    .replace(/<\/?ul>/gi, "")
    .split("</li>")
    .map((item) =>
      item
        .replace(/<li>/gi, "")
        .replace(/<br\s*\/?>/gi, "")
        .replace(/<p>&nbsp;<\/p>/gi, "")
        .replace(/<\/?strong>/gi, "")
        .trim(),
    )
    .filter((item) => item && item !== "&nbsp;");
};
