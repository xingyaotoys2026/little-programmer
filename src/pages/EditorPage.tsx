import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SubtitleDisplay from '../components/SubtitleDisplay';
import SubtitleEditor from '../components/SubtitleEditor';
import ExportPanel from '../components/ExportPanel';
import { Subtitle, parseSRT } from '../utils/subtitleUtils';
import { ArrowLeft, Upload, Plus } from 'lucide-react';

export default function EditorPage() {
  const navigate = useNavigate();
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const parsedSubtitles = parseSRT(content);
        setSubtitles(parsedSubtitles);
      };
      reader.readAsText(file);
    }
  };

  const handleSubtitleClick = (subtitle: Subtitle) => {
    setSelectedSubtitle(subtitle);
  };

  const handleSaveSubtitle = (updatedSubtitle: Subtitle) => {
    setSubtitles(prev => 
      prev.map(sub => sub.id === updatedSubtitle.id ? updatedSubtitle : sub)
    );
    setSelectedSubtitle(null);
  };

  const handleDeleteSubtitle = (id: string) => {
    setSubtitles(prev => prev.filter(sub => sub.id !== id));
    setSelectedSubtitle(null);
  };

  const addNewSubtitle = () => {
    const newSubtitle: Subtitle = {
      id: `subtitle-${Date.now()}`,
      startTime: subtitles.length > 0 ? subtitles[subtitles.length - 1].endTime + 1000 : 0,
      endTime: (subtitles.length > 0 ? subtitles[subtitles.length - 1].endTime : 0) + 3000,
      text: '新字幕',
      isActive: false
    };
    setSubtitles(prev => [...prev, newSubtitle]);
    setSelectedSubtitle(newSubtitle);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">字幕编辑器</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📁 导入字幕文件</h3>
              
              <div className="flex items-center gap-4">
                <div 
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                  <span className="text-gray-600">点击上传字幕文件</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".srt,.vtt,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <button
                  onClick={addNewSubtitle}
                  className="flex items-center gap-2 px-6 py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  <Plus size={24} />
                  添加字幕
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-3">
                支持 SRT、VTT、TXT 格式的字幕文件导入
              </p>
            </div>

            {selectedSubtitle && (
              <SubtitleEditor
                subtitle={selectedSubtitle}
                onSave={handleSaveSubtitle}
                onDelete={handleDeleteSubtitle}
              />
            )}

            {!selectedSubtitle && subtitles.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 添加新字幕</h3>
                
                <button
                  onClick={addNewSubtitle}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
                >
                  <Plus size={24} />
                  点击添加新字幕
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <SubtitleDisplay 
              subtitles={subtitles} 
              currentTime={currentTime}
              onSubtitleClick={handleSubtitleClick}
            />
            <ExportPanel subtitles={subtitles} />
          </div>
        </div>
      </main>
    </div>
  );
}
