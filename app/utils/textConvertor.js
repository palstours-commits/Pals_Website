export const parseHtmlList = (html = "") => {
  if (!html) return [];

  return html
    .replace(/<\/?ul>/g, "")
    .split("</li>")
    .map((item) =>
      item
        .replace(/<li>/g, "")
        .replace(/<br\s*\/?>/g, "")
        .trim(),
    )
    .filter(Boolean);
};
