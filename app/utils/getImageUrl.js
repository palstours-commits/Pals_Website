export const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) return path;
  if (
    path.startsWith("blob:") ||
    path.startsWith("data:") ||
    path.startsWith("/")
  ) {
    return path;
  }
  return `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${path}`;
};
