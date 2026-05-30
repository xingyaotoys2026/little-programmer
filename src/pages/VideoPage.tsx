import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import SubtitleDisplay from '../components/SubtitleDisplay';
import SubtitleEditor from '../components/SubtitleEditor';
import ExportPanel from '../components/ExportPanel';
import { Subtitle } from '../utils/subtitleUtils';
import { ArrowLeft, Upload, Mic, Play, Pause } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VideoPage() {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isListening, startListening, stopListening, interimTranscript } = useSpeechRecognition({
    onResult: (subtitle) => {
      setSubtitles(prev => [...prev, subtitle]);
    }
  });

  useEffect(() => {
    setSubtitles(prev => 
      prev.map(sub => ({
        ...sub,
        isActive: currentTime >= sub.startTime && currentTime <= sub.endTime
      }))
    );
  }, [currentTime]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
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

  const toggleRecognition = () => {
    if (isListening) {
      stopListening();
      setIsRecognizing(false);
    } else {
      startListening();
      setIsRecognizing(true);
    }
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
          <h1 className="text-xl font-bold text-gray-800">视频字幕生成</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📹 视频上传</h3>
              
              {videoUrl ? (
                <VideoPlayer videoUrl={videoUrl} onTimeUpdate={setCurrentTime} />
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-2">点击或拖拽上传视频文件</p>
                  <p className="text-sm text-gray-400">支持 MP4, WebM, AVI 等格式</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🎤 语音识别</h3>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleRecognition}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isListening ? <Pause size={20} /> : <Mic size={20} />}
                  {isListening ? '停止识别' : '开始识别'}
                </button>
                
                {isListening && (
                  <div className="flex-1 bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">正在识别...</span>
                    </div>
                    {interimTranscript && (
                      <p className="text-blue-600 mt-2">{interimTranscript}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedSubtitle && (
              <SubtitleEditor
                subtitle={selectedSubtitle}
                onSave={handleSaveSubtitle}
                onDelete={handleDeleteSubtitle}
              />
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
