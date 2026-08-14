
export const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


export const formatTime = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatFullDateTime = (dateStr: string) => {
  if (!dateStr) return "";
  return `${formatDate(dateStr)} at ${formatTime(dateStr)}`;
};
