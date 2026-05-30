import { useState } from 'react';
import { Subtitle, generateSRT, generateVTT, generateTXT, downloadFile } from '../utils/subtitleUtils';
import { Download, FileText, FileCode } from 'lucide-react';

interface ExportPanelProps {
  subtitles: Subtitle[];
}

export default function ExportPanel({ subtitles }: ExportPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<'srt' | 'vtt' | 'txt'>('srt');

  const handleExport = () => {
    if (subtitles.length === 0) return;

    const filename = `subtitles_${new Date().toISOString().slice(0, 10)}.${selectedFormat}`;
    
    let content = '';
    let type = '';

    switch (selectedFormat) {
      case 'srt':
        content = generateSRT(subtitles);
        type = 'application/x-subrip';
        break;
      case 'vtt':
        content = generateVTT(subtitles);
        type = 'text/vtt';
        break;
      case 'txt':
        content = generateTXT(subtitles);
        type = 'text/plain';
        break;
    }

    downloadFile(content, filename, type);
  };

  const formats = [
    { id: 'srt' as const, name: 'SRT', description: 'SubRip字幕格式', icon: FileText },
    { id: 'vtt' as const, name: 'VTT', description: 'WebVTT字幕格式', icon: FileCode },
    { id: 'txt' as const, name: 'TXT', description: '纯文本格式', icon: FileText },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📤 导出字幕</h3>
      
      <div className="space-y-3 mb-6">
        {formats.map((format) => {
          const Icon = format.icon;
          return (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon size={24} className={selectedFormat === format.id ? 'text-blue-500' : 'text-gray-400'} />
              <div className="text-left">
                <div className="font-medium text-gray-800">{format.name}</div>
                <div className="text-sm text-gray-500">{format.description}</div>
              </div>
              {selectedFormat === format.id && (
                <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <button
        onClick={handleExport}
        disabled={subtitles.length === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={20} />
        导出字幕 ({subtitles.length} 条)
      </button>
    </div>
  );
}
