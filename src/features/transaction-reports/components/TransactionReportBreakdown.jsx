import { BarChart2 } from "lucide-react";
import {
  calculatePercentage,
  formatStatusLabel,
} from "../utils/transactionReportUtils";

export default function TransactionReportBreakdown({ report }) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center mb-4 text-xl font-semibold text-red-950">
        <BarChart2 size={20} className="mr-2" />
        Detailed Breakdown
      </h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 border-b text-left">Status</th>
              <th className="px-4 py-3 border-b text-left">Count</th>
              <th className="px-4 py-3 border-b text-left">Percentage</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(report.statusBreakdown).map(([status, value]) => {
              const count = value || 0;

              return (
                <tr key={status}>
                  <td className="px-4 py-3 border-b capitalize">
                    {formatStatusLabel(status)}
                  </td>
                  <td className="px-4 py-3 border-b">{count}</td>
                  <td className="px-4 py-3 border-b">
                    {calculatePercentage(count, report.totalRequests)}%
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-50 font-medium">
              <td className="px-4 py-3 border-b">Total</td>
              <td className="px-4 py-3 border-b">
                {report.totalRequests || 0}
              </td>
              <td className="px-4 py-3 border-b">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
