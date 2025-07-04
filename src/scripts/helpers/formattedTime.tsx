export const formattedTime = (time: string): string => {
  const date = new Date(time);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};
