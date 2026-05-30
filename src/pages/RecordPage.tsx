import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubtitleDisplay from '../components/SubtitleDisplay';
import SubtitleEditor from '../components/SubtitleEditor';
import ExportPanel from '../components/ExportPanel';
import { Subtitle } from '../utils/subtitleUtils';
import { ArrowLeft, Mic, Play, Pause, RotateCcw } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function RecordPage() {
  const navigate = useNavigate();
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { isListening, startListening, stopListening, interimTranscript } = useSpeechRecognition({
    onResult: (subtitle) => {
      setSubtitles(prev => [...prev, subtitle]);
    }
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 100);
        setCurrentTime(prev => prev + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    setSubtitles(prev => 
      prev.map(sub => ({
        ...sub,
        isActive: currentTime >= sub.startTime && currentTime <= sub.endTime
      }))
    );
  }, [currentTime]);

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
      setElapsedTime(0);
      setCurrentTime(0);
    }
  };

  const handleReset = () => {
    stopListening();
    setIsRecording(false);
    setSubtitles([]);
    setSelectedSubtitle(null);
    setElapsedTime(0);
    setCurrentTime(0);
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

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
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
          <h1 className="text-xl font-bold text-gray-800">实时录音转写</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className={`absolute inset-0 rounded-full ${isRecording ? 'bg-red-100' : 'bg-blue-100'} animate-ping opacity-75`}></div>
                <div className={`relative w-32 h-32 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {isRecording ? <Pause className="text-white" size={40} /> : <Mic className="text-white" size={40} />}
                </div>
              </div>

              <div className="text-4xl font-bold text-gray-800 mb-6">
                {formatTime(elapsedTime)}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? <Pause size={24} /> : <Play size={24} />}
                  {isRecording ? '停止录音' : '开始录音'}
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw size={24} />
                  重置
                </button>
              </div>

              {isRecording && (
                <div className="mt-6 bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">正在识别中...</span>
                  </div>
                  {interimTranscript && (
                    <p className="text-blue-600 text-lg">{interimTranscript}</p>
                  )}
                </div>
              )}
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
