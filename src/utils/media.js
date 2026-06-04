const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8000/api/").replace(/\/api\/?$/, "");

export const getMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${apiBase}${path}`;
};
