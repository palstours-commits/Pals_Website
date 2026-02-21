export const parseHtmlList = (html = "") => {
  if (!html) return [];

  return html
    .replace(/<\/?(ul|ol)>/gi, "")
    .split("</li>")
    .map((item) =>
      item
        .replace(/<li>/gi, "")
        .replace(/<br\s*\/?>/gi, "")
        .replace(/<p>&nbsp;<\/p>/gi, "")
        .replace(/<\/?strong>/gi, "")
        .replace(/<\/?h[1-6][^>]*>/gi, "") // 🔥 remove h1–h6
        .replace(/&nbsp;/gi, "")
        .trim()
    )
    .filter(Boolean);
};