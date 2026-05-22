import { useParams } from "react-router-dom";
import { lessons } from "../data/lessons";
import LessonContent from "../components/LessonContent";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = lessons.find((l) => l.id === parseInt(id || "1"));

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-cyan-500 mb-6 transition-colors mx-auto"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </button>
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">课程未找到</h2>
          <p className="text-gray-600">请选择正确的课程</p>
        </div>
      </div>
    );
  }

  return <LessonContent lesson={lesson} />;
}
