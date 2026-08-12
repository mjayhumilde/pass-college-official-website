const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition";

export default function BlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      {(block.type === "heading" || block.type === "text") && (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {block.type === "heading" ? "Heading Text" : "Body Text"}
          </label>
          {block.type === "text" ? (
            <textarea
              rows={3}
              className={`${inputClass} mt-1 resize-none`}
              value={block.content}
              onChange={(event) =>
                onChange({ ...block, content: event.target.value })
              }
            />
          ) : (
            <input
              type="text"
              className={`${inputClass} mt-1`}
              value={block.content}
              onChange={(event) =>
                onChange({ ...block, content: event.target.value })
              }
            />
          )}
        </div>
      )}

      {block.type === "image" && (
        <>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Image URL
            </label>
            <input
              type="text"
              className={`${inputClass} mt-1`}
              placeholder="https://example.com/image.jpg"
              value={block.url}
              onChange={(event) =>
                onChange({ ...block, url: event.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Alt Text
            </label>
            <input
              type="text"
              className={`${inputClass} mt-1`}
              placeholder="Describe the image"
              value={block.alt}
              onChange={(event) =>
                onChange({ ...block, alt: event.target.value })
              }
            />
          </div>
        </>
      )}

      {block.type === "button" && (
        <>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Button Label
            </label>
            <input
              type="text"
              className={`${inputClass} mt-1`}
              placeholder="Click Here"
              value={block.label}
              onChange={(event) =>
                onChange({ ...block, label: event.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Link URL
            </label>
            <input
              type="text"
              className={`${inputClass} mt-1`}
              placeholder="https://..."
              value={block.url}
              onChange={(event) =>
                onChange({ ...block, url: event.target.value })
              }
            />
          </div>
        </>
      )}

      {block.type === "divider" && (
        <p className="text-xs text-gray-400 italic">
          A horizontal divider line. No settings needed.
        </p>
      )}
    </div>
  );
}
