import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { lessons } from "../data/lessons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              📚 学习课程
            </h2>
            <p className="text-gray-600">
              选择一个课程开始你的编程之旅！
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
              <CourseCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-cyan-50 to-pink-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎮 动手练习
          </h2>
          <p className="text-gray-600 mb-8">
            学习完课程后，来练习区域动手实践吧！
            拖拽积木，让小猫动起来！
          </p>
          <button
            onClick={() => navigate("/practice")}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            🎯 开始练习
          </button>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🎮</span>
            <span className="font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
              小小程序员
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            让每个孩子都爱上编程！
          </p>
        </div>
      </footer>
    </div>
  );
}
