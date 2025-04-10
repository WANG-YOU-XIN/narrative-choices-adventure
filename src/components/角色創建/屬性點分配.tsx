import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Shuffle } from 'lucide-react';
interface 屬性點分配Props {
  stats: {
    attack: number;
    constitution: number;
    agility: number;
    charm: number;
    intelligence: number;
  };
  remainingPoints: number;
  onStatChange: (stat: keyof 屬性點分配Props['stats'], value: number) => void;
}
const 屬性點分配: React.FC<屬性點分配Props> = ({
  stats,
  remainingPoints,
  onStatChange
}) => {
  const getStatName = (stat: string): string => {
    const statNames: Record<string, string> = {
      'attack': '攻擊',
      'constitution': '體質',
      'agility': '敏捷',
      'charm': '魅力',
      'intelligence': '智力'
    };
    return statNames[stat] || stat;
  };
  const handleRandomDistribution = () => {
    // 將當前點數歸零
    Object.keys(stats).forEach(stat => {
      const currentValue = stats[stat as keyof typeof stats];
      if (currentValue > 0) {
        onStatChange(stat as keyof typeof stats, -currentValue);
      }
    });

    // 隨機分配所有可用點數
    const statKeys = Object.keys(stats) as Array<keyof typeof stats>;
    let pointsToAllocate = 20; // 總可用點數

    while (pointsToAllocate > 0) {
      // 隨機選擇一個屬性
      const randomStatIndex = Math.floor(Math.random() * statKeys.length);
      const randomStat = statKeys[randomStatIndex];

      // 為了更均勻的分配，每次只加1點
      onStatChange(randomStat, 1);
      pointsToAllocate--;
    }
  };
  return <div className="p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">屬性點分配</h2>
      <div className="mb-4">
        <p className="text-center">剩餘點數: <span className="font-bold text-xl">{remainingPoints}</span></p>
        
        {/* 隨機分配按鈕 */}
        <div className="flex justify-center mt-2">
          <Button onClick={handleRandomDistribution} disabled={remainingPoints !== 20} className="bg-white text-black hover:bg-gray-200 flex items-center font-normal text-base">
            <Shuffle className="mr-2" size={16} />
            隨機分配
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(stats).map(([stat, value]) => <div key={stat} className="flex items-center justify-between">
            <span className="w-24">{getStatName(stat)}:</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => onStatChange(stat as keyof typeof stats, -1)} disabled={value <= 0} className="bg-white text-black hover:bg-gray-200">
                <Minus size={16} />
              </Button>
              
              <span className="w-8 text-center">{value}</span>
              
              <Button size="sm" onClick={() => onStatChange(stat as keyof typeof stats, 1)} disabled={remainingPoints <= 0} className="bg-white text-black hover:bg-gray-200">
                <Plus size={16} />
              </Button>
            </div>
          </div>)}
      </div>
    </div>;
};
export default 屬性點分配;