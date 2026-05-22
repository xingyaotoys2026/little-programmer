import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import { Lesson } from "../data/lessons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const navigate = useNavigate();
  const [activeExample, setActiveExample] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-cyan-500 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回首页</span>
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: lesson.bgColor }}
            >
              <span className="text-3xl">{lesson.icon}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
              <p className="text-gray-500">{lesson.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {lesson.content.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: lesson.bgColor }}
              >
                <span className="text-2xl">📝</span>
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Play className="text-cyan-500" size={24} />
            举个例子
          </h2>
          
          <div className="space-y-3">
            {lesson.examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(activeExample === index ? null : index)}
                className="w-full flex items-center gap-3 p-4 rounded-xl transition-all"
                style={{ 
                  backgroundColor: activeExample === index ? lesson.bgColor : "#f8fafc" 
                }}
              >
                {activeExample === index ? (
                  <CheckCircle size={20} style={{ color: lesson.color }} />
                ) : (
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: lesson.color, color: "white" }}>
                    {index + 1}
                  </span>
                )}
                <span className="text-gray-700">{example}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/practice")}
          className="w-full py-4 bg-gradient-to-r from-cyan-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          🎯 现在去练习吧！
        </button>
      </div>
    </div>
  );
}
