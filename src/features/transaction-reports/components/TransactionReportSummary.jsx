import { FileText } from "lucide-react";
import ReportStatusCard from "./ReportStatusCard";

export default function TransactionReportSummary({ report }) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center mb-4 text-xl font-semibold text-red-950">
        <FileText size={20} className="mr-2" />
        Summary Overview - {report.timeframe}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ReportStatusCard
          title="Total Requests"
          count={report.totalRequests || 0}
          color="bg-blue-600"
        />
        <ReportStatusCard
          title="Pending"
          count={report.statusBreakdown.pending || 0}
          color="bg-yellow-500"
        />
        <ReportStatusCard
          title="Ready for Pickup"
          count={report.statusBreakdown.readyForPickup || 0}
          color="bg-green-600"
        />
        <ReportStatusCard
          title="Completed"
          count={report.statusBreakdown.completed || 0}
          color="bg-red-600"
        />
      </div>
    </section>
  );
}
