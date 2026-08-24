import { Calendar } from "lucide-react";
import { REPORT_TIMEFRAMES } from "../utils/transactionReportUtils";

export default function ReportTimeframeFilter({
  activeTimeframe,
  onTimeframeChange,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 print:hidden">
      {REPORT_TIMEFRAMES.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onTimeframeChange(timeframe)}
          className={`hover:cursor-pointer px-4 py-2 rounded-md flex items-center ${
            activeTimeframe === timeframe
              ? "bg-red-primary text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          <Calendar size={16} className="mr-2" />
          {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
        </button>
      ))}
    </div>
  );
}
