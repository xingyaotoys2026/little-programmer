import { Subtitle, formatTimeDisplay } from '../utils/subtitleUtils';

interface SubtitleDisplayProps {
  subtitles: Subtitle[];
  currentTime: number;
  onSubtitleClick: (subtitle: Subtitle) => void;
}

export default function SubtitleDisplay({ subtitles, currentTime, onSubtitleClick }: SubtitleDisplayProps) {
  const currentSubtitle = subtitles.find(
    (sub) => currentTime >= sub.startTime && currentTime <= sub.endTime
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 当前字幕</h3>
      
      <div className="mb-6">
        {currentSubtitle ? (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-xl text-gray-800">{currentSubtitle.text}</p>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-400">等待字幕...</p>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 字幕列表</h3>
      
      <div className="max-h-[300px] overflow-y-auto space-y-2">
        {subtitles.length === 0 ? (
          <p className="text-gray-400 text-center py-8">暂无字幕</p>
        ) : (
          subtitles.map((subtitle, index) => (
            <div
              key={subtitle.id}
              onClick={() => onSubtitleClick(subtitle)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                subtitle.isActive
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">#{index + 1}</span>
                <span className="text-xs text-gray-500">
                  {formatTimeDisplay(subtitle.startTime)} - {formatTimeDisplay(subtitle.endTime)}
                </span>
              </div>
              <p className="text-gray-800">{subtitle.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
