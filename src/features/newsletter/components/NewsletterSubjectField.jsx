export default function NewsletterSubjectField({ subject, onSubjectChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Email Subject <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="e.g. PASS College - Latest Updates"
        value={subject}
        onChange={(event) => onSubjectChange(event.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
      />
    </div>
  );
}
