export default function TransactionReportPrintStyles() {
  return (
    <style>{`
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
  );
}
