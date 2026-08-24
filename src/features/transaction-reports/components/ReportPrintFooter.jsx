export default function ReportPrintFooter({ timeframe }) {
  return (
    <footer className="hidden print:block mt-8 pt-4 text-xs text-center border-t text-gray-500">
      <p>School Document Request Transaction Report - {timeframe}</p>
      <p>
        Generated on {new Date().toLocaleDateString()} at{" "}
        {new Date().toLocaleTimeString()}
      </p>
    </footer>
  );
}
