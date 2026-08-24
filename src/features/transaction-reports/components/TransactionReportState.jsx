export default function TransactionReportState({ type }) {
  if (type === "loading") {
    return <p className="p-6">Loading report...</p>;
  }

  if (type === "error") {
    return <p className="p-6 text-red-500">Failed to load report data.</p>;
  }

  return <p className="p-6">No data found.</p>;
}
