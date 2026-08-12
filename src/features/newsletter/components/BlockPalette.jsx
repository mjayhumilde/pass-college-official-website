import { createElement } from "react";
import { BLOCK_TYPES } from "../constants/blockTypes";

export default function BlockPalette({ onAddBlock }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
        Add Blocks
      </p>

      <div className="flex flex-row lg:flex-col gap-2">
        {BLOCK_TYPES.map(({ type, label, icon, color }) => (
          <button
            key={type}
            onClick={() => onAddBlock(type)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition text-left w-full hover:cursor-pointer group"
          >
            <span className={`p-1.5 rounded-lg ${color}`}>
              {createElement(icon, { size: 14 })}
            </span>
            <span className="text-xs font-semibold text-gray-600 hidden lg:block">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
