import { Printer } from "lucide-react";

export default function TransactionReportHeader({ onPrint }) {
  return (
    <header className="flex items-center justify-between mb-6 print:mb-4">
      <div>
        <h1 className="text-2xl font-bold text-red-primary">
          Transaction Report
        </h1>
        <p className="text-sm text-gray-600">Document Request Summary</p>
      </div>

      <div className="flex space-x-4 print:hidden">
        <button
          onClick={onPrint}
          className="flex items-center px-4 py-2 text-white rounded-full bg-red-primary hover:bg-red-800 hover:cursor-pointer"
        >
          <Printer size={18} className="mr-2" />
          Download/Print
        </button>
      </div>
    </header>
  );
}
