import { useState, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";

interface StageProps {
  blocks: Array<{ id: string; type: string; label: string; color: string; action: string }>;
}

interface Position {
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right";
}

export default function Stage({ blocks }: StageProps) {
  const [position, setPosition] = useState<Position>({ x: 150, y: 150, direction: "up" });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const resetPosition = () => {
    setPosition({ x: 150, y: 150, direction: "up" });
    setShowCelebration(false);
  };

  const executeBlocks = async () => {
    if (blocks.length === 0) return;
    
    setIsAnimating(true);
    resetPosition();
    
    await new Promise(resolve => setTimeout(resolve, 300));

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      
      switch (block.action) {
        case "move":
          setPosition(prev => {
            let newX = prev.x;
            let newY = prev.y;
            
            switch (prev.direction) {
              case "up":
                newY = Math.max(20, prev.y - 40);
                break;
              case "down":
                newY = Math.min(280, prev.y + 40);
                break;
              case "left":
                newX = Math.max(20, prev.x - 40);
                break;
              case "right":
                newX = Math.min(280, prev.x + 40);
                break;
            }
            
            return { ...prev, x: newX, y: newY };
          });
          break;
        
        case "moveBack":
          setPosition(prev => {
            let newX = prev.x;
            let newY = prev.y;
            
            switch (prev.direction) {
              case "up":
                newY = Math.min(280, prev.y + 40);
                break;
              case "down":
                newY = Math.max(20, prev.y - 40);
                break;
              case "left":
                newX = Math.min(280, prev.x + 40);
                break;
              case "right":
                newX = Math.max(20, prev.x - 40);
                break;
            }
            
            return { ...prev, x: newX, y: newY };
          });
          break;
        
        case "turnLeft":
          setPosition(prev => {
            const directions: Position["direction"][] = ["up", "left", "down", "right"];
            const currentIndex = directions.indexOf(prev.direction);
            return { ...prev, direction: directions[(currentIndex + 1) % 4] };
          });
          break;
        
        case "turnRight":
          setPosition(prev => {
            const directions: Position["direction"][] = ["up", "right", "down", "left"];
            const currentIndex = directions.indexOf(prev.direction);
            return { ...prev, direction: directions[(currentIndex + 1) % 4] };
          });
          break;
        
        case "repeat":
          for (let j = 0; j < 3; j++) {
            setPosition(prev => {
              let newY = Math.max(20, prev.y - 40);
              return { ...prev, y: newY };
            });
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          break;
        
        case "if":
          if (position.y <= 30) {
            setPosition(prev => ({ ...prev, direction: "down" }));
          }
          break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsAnimating(false);
    setShowCelebration(true);
  };

  useEffect(() => {
    resetPosition();
  }, []);

  const getDirectionAngle = () => {
    switch (position.direction) {
      case "up": return 0;
      case "right": return 90;
      case "down": return 180;
      case "left": return 270;
      default: return 0;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          🎭 舞台
        </h2>
        <div className="flex gap-2">
          <button
            onClick={resetPosition}
            disabled={isAnimating}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            <RotateCcw size={16} />
            重置
          </button>
          <button
            onClick={executeBlocks}
            disabled={isAnimating || blocks.length === 0}
            className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-pink-400 text-white rounded-lg text-sm hover:shadow-md transition-all disabled:opacity-50"
          >
            <Play size={16} />
            运行
          </button>
        </div>
      </div>
      
      <div className="relative w-full h-[300px] bg-gradient-to-b from-sky-200 to-green-200 rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 left-8 text-2xl">☀️</div>
          <div className="absolute top-6 right-12 text-xl">☁️</div>
          <div className="absolute bottom-4 left-1/4 text-xl">🌱</div>
          <div className="absolute bottom-4 right-1/4 text-xl">🌻</div>
        </div>
        
        <div
          className="absolute transition-all duration-300 ease-in-out"
          style={{
            left: position.x,
            top: position.y,
            transform: `translate(-50%, -50%) rotate(${getDirectionAngle()}deg)`
          }}
        >
          <div className="text-5xl drop-shadow-lg">🐱</div>
        </div>
        
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="text-center">
              <div className="text-6xl mb-2 animate-bounce">🎉</div>
              <p className="text-white font-bold text-xl drop-shadow-lg">太棒了！</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
