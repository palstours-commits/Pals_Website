export const getImageUrl = (path) => {
  if (!path || typeof path !== "string") return "";

  if (
    path.startsWith("http") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  if (
    path.startsWith("/_next") ||
    path.startsWith("/images") ||
    path.startsWith("/assets")
  ) {
    return path;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL || "";
  if (path.startsWith("/storage")) {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${path}`;
};
