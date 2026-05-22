export interface Lesson {
  id: number;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  content: string[];
  examples: string[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "认识编程",
    icon: "🤖",
    color: "#FF6B6B",
    bgColor: "#FFE5E5",
    description: "什么是编程？让我们一起探索！",
    content: [
      "编程就是告诉电脑做什么的指令",
      "就像我们说话一样，电脑有自己的语言",
      "通过编程，我们可以让电脑画画、游戏、讲故事",
      "每一个程序都是由很多小指令组成的"
    ],
    examples: ["让小猫走路", "让小鸟唱歌", "让星星闪烁"]
  },
  {
    id: 2,
    title: "顺序指令",
    icon: "👣",
    color: "#4ECDC4",
    bgColor: "#E5F7F6",
    description: "一步一步来，学习顺序执行！",
    content: [
      "顺序就是按照先后顺序做事",
      "就像我们先穿袜子再穿鞋",
      "电脑也会按照我们写的顺序执行指令",
      "先执行第一个，再执行第二个，依此类推"
    ],
    examples: ["起床 → 刷牙 → 吃早餐", "打开书本 → 翻页 → 阅读"]
  },
  {
    id: 3,
    title: "循环指令",
    icon: "🔄",
    color: "#FFE66D",
    bgColor: "#FFFCE5",
    description: "重复做一件事，学习循环！",
    content: [
      "循环就是重复执行同一个指令",
      "就像我们每天都要吃饭睡觉",
      "使用循环可以让代码更简洁",
      "告诉电脑重复几次就可以了"
    ],
    examples: ["跑步跑5圈", "读同一本书3遍", "跳10次绳"]
  },
  {
    id: 4,
    title: "条件指令",
    icon: "❓",
    color: "#95E1D3",
    bgColor: "#E8F8F5",
    description: "根据条件做不同的事情！",
    content: [
      "条件就是判断真假",
      "如果下雨就带伞，如果晴天就戴帽子",
      "电脑会先判断条件是否成立",
      "然后决定执行哪一段代码"
    ],
    examples: ["如果饿了就吃饭", "如果困了就睡觉", "如果红灯就停下"]
  }
];

export interface Block {
  id: string;
  type: string;
  label: string;
  color: string;
  action: string;
}

export const blocks: Block[] = [
  { id: "move", type: "action", label: "前进", color: "#FF6B6B", action: "move" },
  { id: "moveBack", type: "action", label: "后退", color: "#FF8E8E", action: "moveBack" },
  { id: "turnLeft", type: "action", label: "左转", color: "#4ECDC4", action: "turnLeft" },
  { id: "turnRight", type: "action", label: "右转", color: "#6DD5C9", action: "turnRight" },
  { id: "repeat", type: "loop", label: "重复3次", color: "#FFE66D", action: "repeat" },
  { id: "if", type: "condition", label: "如果碰到边缘", color: "#95E1D3", action: "if" },
];
