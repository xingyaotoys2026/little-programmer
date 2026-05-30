import { useState } from 'react';
import { Subtitle, formatTimeDisplay } from '../utils/subtitleUtils';
import { Save, Trash2 } from 'lucide-react';

interface SubtitleEditorProps {
  subtitle: Subtitle;
  onSave: (subtitle: Subtitle) => void;
  onDelete: (id: string) => void;
}

export default function SubtitleEditor({ subtitle, onSave, onDelete }: SubtitleEditorProps) {
  const [text, setText] = useState(subtitle.text);
  const [startTime, setStartTime] = useState(subtitle.startTime);
  const [endTime, setEndTime] = useState(subtitle.endTime);

  const handleSave = () => {
    onSave({
      ...subtitle,
      text,
      startTime,
      endTime
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">✏️ 编辑字幕</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">字幕内容</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
            <input
              type="number"
              value={startTime}
              onChange={(e) => setStartTime(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-xs text-gray-500">{formatTimeDisplay(startTime)}</span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
            <input
              type="number"
              value={endTime}
              onChange={(e) => setEndTime(Math.max(startTime, parseInt(e.target.value) || startTime))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-xs text-gray-500">{formatTimeDisplay(endTime)}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save size={18} />
            保存
          </button>
          
          <button
            onClick={() => onDelete(subtitle.id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={18} />
            删除
          </button>
        </div>
      </div>
    </div>
  );
}
