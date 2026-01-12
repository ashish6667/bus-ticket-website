// src/utils/dateTime.js
export const getISTDateTime = () => {
  const date = new Date();
  // Convert to IST (+5:30)
  const istOffset = 5.5 * 60; // in minutes
  const istTime = new Date(date.getTime() + (istOffset + date.getTimezoneOffset()) * 60000);
  return istTime.toLocaleString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
