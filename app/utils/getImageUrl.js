export const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) return path;
  if (path.startsWith("blob:") || path.startsWith("data:")) return path;
  if (path.startsWith("/_next/")) return path;
  if (path.startsWith("/storage")) {
    return `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${path}`;
  }
  return `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${path}`;
};
