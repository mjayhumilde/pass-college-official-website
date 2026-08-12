import { Eye, EyeOff, GripVertical, Mail, Trash2 } from "lucide-react";
import { BLOCK_TYPES } from "../constants/blockTypes";
import BlockEditor from "./BlockEditor";
import EmailPreview from "./EmailPreview";

const getBlockSummary = (block) => {
  if (block.type === "heading") return block.content || "Heading";
  if (block.type === "text") return block.content || "Text block";
  if (block.type === "image") return block.url || "No image URL set";
  if (block.type === "button") return block.label || "Button";
  return "-- Divider --";
};

export default function NewsletterCanvas({
  activeBlockId,
  blocks,
  onDeleteBlock,
  onDragEnd,
  onDragEnter,
  onDragStart,
  onSelectBlock,
  onTogglePreview,
  onUpdateBlock,
  showPreview,
  subject,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-96">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Canvas
        </p>
        <button
          onClick={onTogglePreview}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-primary transition hover:cursor-pointer"
        >
          {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {showPreview ? (
        <div className="p-4">
          <EmailPreview subject={subject} blocks={blocks} />
        </div>
      ) : (
        <div className="p-4 space-y-2">
          {blocks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
              <Mail size={40} className="mb-3" />
              <p className="text-sm font-medium">
                Click a block type to start building
              </p>
            </div>
          )}

          {blocks.map((block, index) => {
            const meta = BLOCK_TYPES.find((item) => item.type === block.type);
            const Icon = meta?.icon;
            const isActive = activeBlockId === block.id;

            return (
              <div
                key={block.id}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragEnter={() => onDragEnter(index)}
                onDragEnd={onDragEnd}
                onDragOver={(event) => event.preventDefault()}
                onClick={() => onSelectBlock(isActive ? null : block.id)}
                className={`group flex items-start gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
                  isActive
                    ? "border-red-400 bg-red-50"
                    : "border-gray-100 hover:border-gray-300 bg-gray-50"
                }`}
              >
                <div className="mt-0.5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing">
                  <GripVertical size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`p-1 rounded ${meta?.color}`}>
                      {Icon && <Icon size={12} />}
                    </span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {meta?.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 truncate">
                    {getBlockSummary(block)}
                  </p>

                  {isActive && (
                    <div
                      className="mt-3"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <BlockEditor block={block} onChange={onUpdateBlock} />
                    </div>
                  )}
                </div>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteBlock(block.id);
                  }}
                  className="mt-0.5 text-gray-300 hover:text-red-500 transition hover:cursor-pointer flex-shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
