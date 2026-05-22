import { useState } from "react";
import BlocklyArea from "../components/BlocklyArea";
import Stage from "../components/Stage";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Block {
  id: string;
  type: string;
  label: string;
  color: string;
  action: string;
}

export default function Practice() {
  const [selectedBlocks, setSelectedBlocks] = useState<Block[]>([]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-cyan-500 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回首页</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎮 编程练习
          </h1>
          <p className="text-gray-600">
            拖拽积木到工作区，让小猫动起来！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BlocklyArea 
            onBlocksChange={setSelectedBlocks}
            selectedBlocks={selectedBlocks}
          />
          <Stage blocks={selectedBlocks} />
        </div>

        <div className="mt-8 bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💡 小贴士</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span>👉</span>
              <span>拖拽积木到工作区来创建程序</span>
            </li>
            <li className="flex items-start gap-2">
              <span>👉</span>
              <span>点击积木上的 ✕ 可以删除它</span>
            </li>
            <li className="flex items-start gap-2">
              <span>👉</span>
              <span>点击运行按钮让小猫执行你的程序</span>
            </li>
            <li className="flex items-start gap-2">
              <span>👉</span>
              <span>点击重置按钮可以让小猫回到起点</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
