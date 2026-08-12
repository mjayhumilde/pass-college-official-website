export default function EmailPreview({ subject, blocks }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl min-h-64">
      <div className="bg-white rounded-lg shadow-sm max-w-lg mx-auto overflow-hidden">
        <div className="bg-red-800 px-6 py-4">
          <p className="text-white text-xs uppercase tracking-widest font-semibold opacity-70">
            Pass College
          </p>
          <p className="text-white font-bold text-base mt-0.5">
            {subject || "Your Newsletter Subject"}
          </p>
        </div>

        <div className="px-6 py-5 space-y-3">
          {blocks.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-6 italic">
              Add blocks to preview your email...
            </p>
          )}

          {blocks.map((block) => (
            <div key={block.id}>
              {block.type === "heading" && (
                <h2 className="text-xl font-bold text-red-800">
                  {block.content || "Heading"}
                </h2>
              )}

              {block.type === "text" && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {block.content || "Text content"}
                </p>
              )}

              {block.type === "image" && block.url && (
                <img
                  src={block.url}
                  alt={block.alt}
                  className="w-full rounded"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}

              {block.type === "image" && !block.url && (
                <div className="bg-gray-100 rounded h-24 flex items-center justify-center text-gray-400 text-sm">
                  Image preview
                </div>
              )}

              {block.type === "button" && (
                <div>
                  <span className="inline-block bg-red-800 text-white text-sm font-semibold px-5 py-2 rounded">
                    {block.label || "Click Here"}
                  </span>
                </div>
              )}

              {block.type === "divider" && <hr className="border-gray-200" />}
            </div>
          ))}

          {blocks.length > 0 && (
            <p className="text-xs text-gray-400 pt-3 border-t border-gray-100">
              Don't want these emails?{" "}
              <span className="text-red-700 underline cursor-pointer">
                Unsubscribe here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
