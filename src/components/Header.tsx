import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl">🎮</span>
          <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
            小小程序员
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-600 hover:text-cyan-500 transition-colors"
          >
            <Home size={18} />
            <span>首页</span>
          </button>
          <button 
            onClick={() => navigate("/practice")}
            className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-400 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            开始练习
          </button>
        </nav>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            <button 
              onClick={() => { navigate("/"); setIsMenuOpen(false); }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              🏠 首页
            </button>
            <button 
              onClick={() => { navigate("/practice"); setIsMenuOpen(false); }}
              className="w-full py-2 px-3 bg-gradient-to-r from-cyan-400 to-pink-400 text-white rounded-lg font-medium"
            >
              🎯 开始练习
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
