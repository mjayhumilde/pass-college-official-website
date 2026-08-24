import { useEffect, useState } from "react";
import api from "../../../store/api";
import ReportPrintFooter from "../components/ReportPrintFooter";
import ReportPrintMetadata from "../components/ReportPrintMetadata";
import ReportTimeframeFilter from "../components/ReportTimeframeFilter";
import TransactionReportBreakdown from "../components/TransactionReportBreakdown";
import TransactionReportHeader from "../components/TransactionReportHeader";
import TransactionReportPrintStyles from "../components/TransactionReportPrintStyles";
import TransactionReportState from "../components/TransactionReportState";
import TransactionReportSummary from "../components/TransactionReportSummary";

export default function TransactionReportPage() {
  const [activeTimeframe, setActiveTimeframe] = useState("today");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(
          `/api/v1/document-report/summary?range=${activeTimeframe}`,
        );
        setReport(response.data.data);
      } catch (requestError) {
        console.error(requestError);
        setError("Failed to load report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
    window.scrollTo(0, 0);
  }, [activeTimeframe]);

  if (loading) {
    return <TransactionReportState type="loading" />;
  }

  if (error) {
    return <TransactionReportState type="error" />;
  }

  if (!report) {
    return <TransactionReportState type="empty" />;
  }

  return (
    <main className="min-h-screen bg-white">
      <div
        id="printableArea"
        className="p-6 mx-auto bg-white md:py-10 max-w-7xl print:py-2 print:px-2"
      >
        <TransactionReportHeader onPrint={() => window.print()} />
        <ReportTimeframeFilter
          activeTimeframe={activeTimeframe}
          onTimeframeChange={setActiveTimeframe}
        />
        <ReportPrintMetadata timeframe={report.timeframe} />
        <TransactionReportSummary report={report} />
        <TransactionReportBreakdown report={report} />
        <ReportPrintFooter timeframe={report.timeframe} />
      </div>

      <TransactionReportPrintStyles />
    </main>
  );
}
