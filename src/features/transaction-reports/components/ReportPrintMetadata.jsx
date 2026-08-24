export default function ReportPrintMetadata({ timeframe }) {
  return (
    <div className="hidden mb-4 print:block">
      <h2 className="text-xl font-semibold">Period: {timeframe}</h2>
      <p className="text-sm text-gray-600">
        Generated on: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
