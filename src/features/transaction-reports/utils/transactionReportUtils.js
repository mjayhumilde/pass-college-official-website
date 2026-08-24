export const REPORT_TIMEFRAMES = ["today", "week", "month", "year"];

export function calculatePercentage(count, total) {
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

export function formatStatusLabel(status) {
  return status.replace(/([A-Z])/g, " $1");
}
