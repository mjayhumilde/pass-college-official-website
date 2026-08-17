import notificationTabs from "../constants/notificationTabs";

export default function NotificationTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex space-x-1 md:space-x-2 min-w-max">
        {notificationTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-2 text-sm md:text-base rounded-md transition-colors hover:cursor-pointer ${
              activeTab === tab.id
                ? "bg-red-primary text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
