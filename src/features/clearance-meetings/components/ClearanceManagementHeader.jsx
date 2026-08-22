import { Calendar } from "lucide-react";

export default function ClearanceManagementHeader({
  awaitingCount,
  scheduledCount,
  totalCount,
}) {
  return (
    <header className="bg-gradient-to-r from-red-primary to-red-700 px-6 py-12 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
            <Calendar className="text-red-primary" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">
              Clearance Management
            </h1>
            <p className="text-red-50 text-lg">
              Review and schedule clearance meetings with students
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-amber-800 bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-white">
            <p className="text-sm font-medium opacity-90">Pending Clearances</p>
            <p className="text-3xl font-bold mt-1">{totalCount}</p>
          </div>
          <div className="bg-amber-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
            <p className="text-sm font-medium opacity-90">Awaiting Schedule</p>
            <p className="text-3xl font-bold mt-1">{awaitingCount}</p>
          </div>
          <div className="bg-green-500 bg-opacity-30 backdrop-blur-sm rounded-xl p-4 text-white">
            <p className="text-sm font-medium opacity-90">Scheduled</p>
            <p className="text-3xl font-bold mt-1">{scheduledCount}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
