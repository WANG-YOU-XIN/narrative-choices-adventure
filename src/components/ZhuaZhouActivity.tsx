
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '../context/GameContext';
import { getRandomZhuaZhouItems, getStoryNode } from '../data/storyData';
import { Book, Briefcase, Award } from 'lucide-react';

// 根据物品ID选择对应的图标
const getItemIcon = (itemId: string) => {
  switch (itemId) {
    case 'book':
      return <Book size={48} />;
    case 'money':
      return <Briefcase size={48} />;
    default:
      return <Award size={48} />;
  }
};

const ZhuaZhouActivity: React.FC = () => {
  const { setCurrentNode, updateStat, increaseAge } = useGame();
  const [items, setItems] = useState<any[]>([]);
  
  useEffect(() => {
    // 在组件加载时，获取随机的抓周物品
    setItems(getRandomZhuaZhouItems(3));
  }, []);

  const handleItemSelected = (item: any) => {
    // 记录选择的天赦
    console.log(`選擇了: ${item.name}, 天賦: ${item.talent}`);
    
    // 进入下一年
    increaseAge(1);
    
    // 跳转到下一个故事节点
    const nextNode = getStoryNode('year_two');
    setCurrentNode(nextNode);
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2 className="text-xl text-game-text text-center mb-6">選擇一樣物品，這將決定你的天賦</h2>
      
      <div className="grid grid-cols-3 gap-4 w-full">
        {items.map((item, index) => (
          <Button
            key={index}
            onClick={() => handleItemSelected(item)}
            className="flex flex-col items-center p-4 h-auto bg-opacity-50 bg-gray-800 hover:bg-game-accent transition-all duration-300"
          >
            <div className="text-4xl mb-2">
              {item.icon}
            </div>
            <span className="text-sm text-game-text">{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ZhuaZhouActivity;
