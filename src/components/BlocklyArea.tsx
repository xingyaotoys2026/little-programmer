import { useState } from "react";
import { blocks } from "../data/lessons";

interface BlocklyAreaProps {
  onBlocksChange: (blocks: Array<{ id: string; type: string; label: string; color: string; action: string }>) => void;
  selectedBlocks: Array<{ id: string; type: string; label: string; color: string; action: string }>;
}

export default function BlocklyArea({ onBlocksChange, selectedBlocks }: BlocklyAreaProps) {
  const [draggedBlock, setDraggedBlock] = useState<typeof blocks[0] | null>(null);

  const handleDragStart = (block: typeof blocks[0]) => {
    setDraggedBlock(block);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedBlock) {
      const newBlock = { ...draggedBlock, id: `${draggedBlock.id}-${Date.now()}` };
      onBlocksChange([...selectedBlocks, newBlock]);
    }
    setDraggedBlock(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeBlock = (index: number) => {
    const newBlocks = selectedBlocks.filter((_, i) => i !== index);
    onBlocksChange(newBlocks);
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        🧩 积木区
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {blocks.map((block) => (
          <div
            key={block.id}
            draggable
            onDragStart={() => handleDragStart(block)}
            onDragEnd={handleDragEnd}
            className="px-4 py-2 rounded-xl font-medium cursor-grab active:cursor-grabbing hover:scale-105 transition-transform shadow-md"
            style={{ backgroundColor: block.color, color: "white" }}
          >
            {block.label}
          </div>
        ))}
      </div>

      <h3 className="text-md font-medium text-gray-700 mb-3">工作区</h3>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="min-h-[200px] border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50"
      >
        {selectedBlocks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">把积木拖到这里！</p>
        ) : (
          <div className="space-y-2">
            {selectedBlocks.map((block, index) => (
              <div
                key={block.id}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-md group"
                style={{ backgroundColor: block.color, color: "white" }}
              >
                <span className="text-sm opacity-70">{index + 1}.</span>
                <span>{block.label}</span>
                <button
                  onClick={() => removeBlock(index)}
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
