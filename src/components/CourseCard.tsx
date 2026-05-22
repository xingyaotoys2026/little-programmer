import { ArrowRight } from "lucide-react";
import { Lesson } from "../data/lessons";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  lesson: Lesson;
}

export default function CourseCard({ lesson }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/lesson/${lesson.id}`)}
      className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"
        style={{ backgroundColor: lesson.color }}
      ></div>
      
      <div className="relative z-10">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
          {lesson.icon}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
        
        <p className="text-gray-600 mb-4">{lesson.description}</p>
        
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-sm">开始学习</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: lesson.color }}
      ></div>
    </button>
  );
}
