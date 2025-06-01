import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  FileText,
  Printer,
  BarChart2,
  ArrowRight,
} from "lucide-react";

// Mock data for demonstration
const generateMockData = (count, timeframe) => {
  return {
    timeframe,
    totalRequests: count,
    statusBreakdown: {
      pending: Math.floor(count * 0.3),
      readyForPickup: Math.floor(count * 0.4),
      completed: Math.floor(count * 0.2),
      cancelled: Math.floor(count * 0.1),
    },
  };
};

const mockData = {
  today: generateMockData(24, "Today"),
  week: generateMockData(87, "This Week"),
  month: generateMockData(342, "This Month"),
  year: generateMockData(1854, "This Year"),
};

export default function TransactionReport() {
  const [activeTimeframe, setActiveTimeframe] = useState("today");
  const [data, setData] = useState(mockData.today);
  const reportRef = useRef(null);

  // In a real application, you would fetch data from an API
  useEffect(() => {
    setData(mockData[activeTimeframe]);
    window.scrollTo(0, 0);
  }, [activeTimeframe]);

  const handlePrint = () => {
    window.print();
  };

  const StatusCard = ({ title, count, color }) => (
    <div className={`${color} rounded-lg p-4 shadow-md flex flex-col`}>
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{count}</span>
        <ArrowRight className="text-white" size={20} />
      </div>
    </div>
  );

  return (
    <>
      {/* Main content that will be printed */}
      <div
        ref={reportRef}
        className="px-4 py-6 mx-auto bg-white max-w-7xl print:py-2 print:px-2 print:shadow-none"
        id="printableArea"
      >
        {/* Header */}
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
              className="flex items-center px-4 py-2 text-white transition-colors rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer"
            >
              <Printer size={18} className="mr-2" />
              Print Report
            </button>
          </div>
        </div>

        {/* Time Period Selector */}
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

        {/* Print-only timeframe label */}
        <div className="hidden mb-4 print:block">
          <h2 className="text-xl font-semibold">Period: {data.timeframe}</h2>
          <p className="text-sm text-gray-600">
            Generated on: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="flex items-center text-xl font-semibold text-red-950">
              <FileText size={20} className="mr-2" />
              Summary Overview - {data.timeframe}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatusCard
              title="Total Requests"
              count={data.totalRequests}
              color="bg-blue-600"
            />
            <StatusCard
              title="Pending"
              count={data.statusBreakdown.pending}
              color="bg-yellow-500"
            />
            <StatusCard
              title="Ready for Pickup"
              count={data.statusBreakdown.readyForPickup}
              color="bg-green-500"
            />
            <StatusCard
              title="Completed"
              count={data.statusBreakdown.completed}
              color="bg-red-primary"
            />
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="flex items-center text-xl font-semibold text-red-950">
              <BarChart2 size={20} className="mr-2" />
              Detailed Breakdown
            </h2>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left border-b">Status</th>
                  <th className="px-4 py-3 text-left border-b">Count</th>
                  <th className="px-4 py-3 text-left border-b">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border-b">Pending</td>
                  <td className="px-4 py-3 border-b">
                    {data.statusBreakdown.pending}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {Math.round(
                      (data.statusBreakdown.pending / data.totalRequests) * 100
                    )}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b">Ready for Pickup</td>
                  <td className="px-4 py-3 border-b">
                    {data.statusBreakdown.readyForPickup}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {Math.round(
                      (data.statusBreakdown.readyForPickup /
                        data.totalRequests) *
                        100
                    )}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b">Completed</td>
                  <td className="px-4 py-3 border-b">
                    {data.statusBreakdown.completed}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {Math.round(
                      (data.statusBreakdown.completed / data.totalRequests) *
                        100
                    )}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b">Cancelled</td>
                  <td className="px-4 py-3 border-b">
                    {data.statusBreakdown.cancelled}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {Math.round(
                      (data.statusBreakdown.cancelled / data.totalRequests) *
                        100
                    )}
                    %
                  </td>
                </tr>
                <tr className="font-medium bg-gray-50">
                  <td className="px-4 py-3 border-b">Total</td>
                  <td className="px-4 py-3 border-b">{data.totalRequests}</td>
                  <td className="px-4 py-3 border-b">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Type Breakdown */}
        <div>
          <div className="mb-4">
            <h2 className="flex items-center text-xl font-semibold text-red-950">
              <FileText size={20} className="mr-2" />
              Document Type Breakdown
            </h2>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left border-b">
                    Document Type
                  </th>
                  <th className="px-4 py-3 text-left border-b">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border-b">Transcript of Records</td>
                  <td className="px-4 py-3 border-b">
                    {Math.floor(data.totalRequests * 0.35)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b">
                    Certificate of Enrollment
                  </td>
                  <td className="px-4 py-3 border-b">
                    {Math.floor(data.totalRequests * 0.25)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b">Diploma</td>
                  <td className="px-4 py-3 border-b">
                    {Math.floor(data.totalRequests * 0.15)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b">Good Moral Certificate</td>
                  <td className="px-4 py-3 border-b">
                    {Math.floor(data.totalRequests * 0.15)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b">Other Documents</td>
                  <td className="px-4 py-3 border-b">
                    {Math.floor(data.totalRequests * 0.1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer for printed version */}
        <div className="hidden pt-4 mt-8 text-xs text-center text-gray-500 border-t print:block">
          <p>School Document Request Transaction Report - {data.timeframe}</p>
          <p>
            Generated on {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Global print styles */}
      <style jsx global>{`
        @media print {
          /* Hide everything except the printable area */
          body * {
            visibility: hidden;
          }

          /* But display the printable content */
          #printableArea,
          #printableArea * {
            visibility: visible;
          }

          /* Position the printable content at the top */
          #printableArea {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }

          /* Additional print styling */
          @page {
            size: portrait;
            margin: 1cm;
          }

          .print-color-adjust {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </>
  );
}
