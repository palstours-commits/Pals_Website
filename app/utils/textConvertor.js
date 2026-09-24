const stripEmptyTags = (text) => {
  const emptyTag = /<([a-z0-9]+)(?:\s[^>]*)?>\s*<\/\1>/gi;
  let prev;
  do {
    prev = text;
    text = text.replace(emptyTag, "");
  } while (text !== prev);
  return text;
};

const cleanListItem = (item, options = {}) => {
  const text = stripEmptyTags(
    String(item ?? "")
      .replace(/&check;|&checkmark;|&#10003;|&#x2713;/gi, "✓")
      .replace(/&#10004;|&#x2714;/gi, "✔")
      .replace(/<\/?ul[^>]*>|<\/?ol[^>]*>/gi, "")
      .replace(/&nbsp;|&bull;|&middot;|&bullet;|&#8226;|&#x2022;/gi, " ")
      .replace(/[•●◦‣▪‿⁃·]/g, "")
  );

  const innerText = stripEmptyTags(text).replace(/<[^>]+>/g, "").trim();
  if (!innerText) return "";

  let result = text
    .replace(/<p>/gi, "")
    .replace(/<li>/gi, "")
    .replace(/<br\s*\/?>/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!options.preserveStrong) {
    result = result.replace(/<\/?strong>/gi, "");
  }

  return result;
};

export const parseHtmlList = (html = "", options = {}) => {
  if (Array.isArray(html)) {
    return html.map((item) => cleanListItem(item, options)).filter(Boolean);
  }

  if (typeof html !== "string") return [];

  try {
    return html
      .split(/<\/p>|<\/li>/i)
      .map((item) => cleanListItem(item, options))
      .filter(Boolean);
  } catch {
    return [];
  }
};