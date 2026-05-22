import { Sparkles, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100"></div>
      
      <div className="absolute top-20 left-10 text-6xl animate-bounce" style={{ animationDelay: "0s" }}>⭐</div>
      <div className="absolute top-32 right-16 text-4xl animate-bounce" style={{ animationDelay: "0.5s" }}>🌟</div>
      <div className="absolute bottom-24 left-20 text-5xl animate-bounce" style={{ animationDelay: "1s" }}>✨</div>
      <div className="absolute bottom-32 right-10 text-4xl animate-bounce" style={{ animationDelay: "1.5s" }}>💫</div>
      <div className="absolute top-1/3 right-1/4 text-3xl animate-pulse">🌈</div>
      <div className="absolute bottom-1/3 left-1/4 text-3xl animate-pulse">🦄</div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl mb-6 animate-bounce">
            <span className="text-5xl">🤖</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            欢迎来到编程世界！
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          小朋友们，让我们一起学习编程的神奇魔法吧！
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="inline-flex items-center gap-1 px-4 py-2 bg-white rounded-full shadow-md">
            <Sparkles className="text-yellow-500" size={18} />
            <span className="text-sm text-gray-700">有趣的课程</span>
          </span>
          <span className="inline-flex items-center gap-1 px-4 py-2 bg-white rounded-full shadow-md">
            <Star className="text-yellow-500" size={18} />
            <span className="text-sm text-gray-700">轻松学习</span>
          </span>
        </div>

        <div className="animate-bounce">
          <span className="text-4xl">👇</span>
          <p className="text-gray-500 text-sm mt-2">向下滚动开始探索</p>
        </div>
      </div>
    </section>
  );
}
