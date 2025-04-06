
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

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

const 屬性點分配: React.FC<屬性點分配Props> = ({ stats, remainingPoints, onStatChange }) => {
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

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">屬性點分配</h2>
      <div className="mb-4">
        <p className="text-center">剩餘點數: <span className="font-bold text-xl">{remainingPoints}</span></p>
      </div>

      <div className="space-y-4">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center justify-between">
            <span className="w-24">{getStatName(stat)}:</span>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm"
                onClick={() => onStatChange(stat as keyof typeof stats, -1)}
                disabled={value <= 0}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Minus size={16} />
              </Button>
              
              <span className="w-8 text-center">{value}</span>
              
              <Button 
                size="sm"
                onClick={() => onStatChange(stat as keyof typeof stats, 1)}
                disabled={remainingPoints <= 0}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default 屬性點分配;
