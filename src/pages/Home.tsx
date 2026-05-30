import { useNavigate } from 'react-router-dom';
import { Video, Mic, Upload, FileText } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Video,
      title: '视频字幕生成',
      description: '上传视频文件，自动识别语音生成字幕',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      path: '/video'
    },
    {
      icon: Mic,
      title: '实时录音转写',
      description: '使用麦克风录音，实时生成字幕',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      path: '/record'
    },
    {
      icon: Upload,
      title: '导入字幕文件',
      description: '支持导入SRT/VTT文件进行编辑',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      path: '/editor'
    },
    {
      icon: FileText,
      title: '字幕编辑器',
      description: '编辑字幕内容和时间轴，支持多种格式导出',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      path: '/editor'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">字幕生成器</h1>
              <p className="text-xs text-gray-500">视频语音识别同步字幕</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-6">
            <Mic className="animate-pulse" size={18} />
            支持实时语音识别
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            视频语音识别
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              同步字幕
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            上传视频或使用麦克风录音，自动识别语音并生成同步字幕。支持多种格式导出，让您的视频更加无障碍。
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(feature.path)}
                  className="group text-left bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-gray-700" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className={`mt-4 inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    开始使用
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h3 className="text-2xl font-bold mb-4">为什么选择我们？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">高精度识别</h4>
              <p className="text-blue-100">基于Web Speech API，支持多种语言识别</p>
            </div>
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2">实时同步</h4>
              <p className="text-blue-100">字幕与语音实时同步，延迟极低</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📤</div>
              <h4 className="font-semibold mb-2">多格式导出</h4>
              <p className="text-blue-100">支持SRT、VTT、TXT等多种格式</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-500">字幕生成器 - 让视频更有意义</p>
        </div>
      </footer>
    </div>
  );
}
