import { useState, useEffect, useRef } from "react";
import { Calendar, FileText, Printer, BarChart2 } from "lucide-react";
import api from "../store/api";

export default function TransactionReport() {
  const [activeTimeframe, setActiveTimeframe] = useState("today");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef(null);

  const fetchReport = async (period) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(
        `/api/v1/document-report/summary?range=${period}`
      );

      setData(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(activeTimeframe);
    window.scrollTo(0, 0);
  }, [activeTimeframe]);

  const handlePrint = () => window.print();

  const StatusCard = ({ title, count, color }) => (
    <div className={`${color} rounded-lg p-4 shadow-md flex flex-col`}>
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>

      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{count}</span>
      </div>
    </div>
  );

  if (loading) return <p className="p-6">Loading report...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!data) return <p className="p-6">No data found.</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* PRINTABLE AREA */}
      <div
        ref={reportRef}
        id="printableArea"
        className="p-6 mx-auto bg-white md:py-10 max-w-7xl print:py-2 print:px-2"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 print:mb-4">
          <div>
            <h1 className="text-2xl font-bold text-red-primary">
              Transaction Report
            </h1>
            <p className="text-sm text-gray-600">Document Request Summary</p>
          </div>

          <div className="flex space-x-4 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 text-white rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer"
            >
              <Printer size={18} className="mr-2" />
              Download/Print
            </button>
          </div>
        </div>

        {/* TIMEFRAME FILTER */}
        <div className="flex flex-wrap gap-2 mb-6 print:hidden">
          {["today", "week", "month", "year"].map((period) => (
            <button
              key={period}
              onClick={() => setActiveTimeframe(period)}
              className={`hover:cursor-pointer px-4 py-2 rounded-md flex items-center ${
                activeTimeframe === period
                  ? "bg-red-primary text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <Calendar size={16} className="mr-2" />
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* PRINT LABEL */}
        <div className="hidden mb-4 print:block">
          <h2 className="text-xl font-semibold">Period: {data.timeframe}</h2>
          <p className="text-sm text-gray-600">
            Generated on: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="mb-8">
          <h2 className="flex items-center mb-4 text-xl font-semibold text-red-950">
            <FileText size={20} className="mr-2" />
            Summary Overview – {data.timeframe}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatusCard
              title="Total Requests"
              count={data.totalRequests || 0}
              color="bg-blue-600"
            />
            <StatusCard
              title="Pending"
              count={data.statusBreakdown.pending || 0}
              color="bg-yellow-500"
            />
            <StatusCard
              title="Ready for Pickup"
              count={data.statusBreakdown.readyForPickup || 0}
              color="bg-green-600"
            />
            <StatusCard
              title="Completed"
              count={data.statusBreakdown.completed || 0}
              color="bg-red-600"
            />
          </div>
        </div>

        {/* DETAILED BREAKDOWN */}
        <div className="mb-8">
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
                {Object.entries(data.statusBreakdown).map(([label, value]) => {
                  const count = value || 0;
                  const percentage =
                    data.totalRequests > 0
                      ? Math.round((count / data.totalRequests) * 100)
                      : 0;

                  return (
                    <tr key={label}>
                      <td className="px-4 py-3 border-b capitalize">
                        {label.replace(/([A-Z])/g, " $1")}
                      </td>
                      <td className="px-4 py-3 border-b">{count}</td>
                      <td className="px-4 py-3 border-b">{percentage}%</td>
                    </tr>
                  );
                })}

                <tr className="bg-gray-50 font-medium">
                  <td className="px-4 py-3 border-b">Total</td>
                  <td className="px-4 py-3 border-b">
                    {data.totalRequests || 0}
                  </td>
                  <td className="px-4 py-3 border-b">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PRINT FOOTER */}
        <div className="hidden print:block mt-8 pt-4 text-xs text-center border-t text-gray-500">
          <p>School Document Request Transaction Report – {data.timeframe}</p>
          <p>
            Generated on {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* PRINT STYLES */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printableArea,
          #printableArea * {
            visibility: visible;
          }
          #printableArea {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: portrait;
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
}
