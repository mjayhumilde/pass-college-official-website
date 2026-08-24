export default function ReportStatusCard({ color, count, title }) {
  return (
    <div className={`${color} rounded-lg p-4 shadow-md flex flex-col`}>
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{count}</span>
      </div>
    </div>
  );
}
