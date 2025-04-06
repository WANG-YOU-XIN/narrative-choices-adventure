
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const TOTAL_POINTS = 10;

interface 屬性點分配Props {
  onComplete: () => void;
}

const 屬性點分配: React.FC<屬性點分配Props> = ({ onComplete }) => {
  const { updateStat } = useGame();
  const [availablePoints, setAvailablePoints] = useState(TOTAL_POINTS);
  const [stats, setStats] = useState({
    attack: 0,
    constitution: 0,
    agility: 0,
    charm: 0,
    intelligence: 0
  });

  const handleIncrement = (statName: keyof typeof stats) => {
    if (availablePoints > 0) {
      setStats(prev => ({ ...prev, [statName]: prev[statName] + 1 }));
      setAvailablePoints(prev => prev - 1);
    }
  };

  const handleDecrement = (statName: keyof typeof stats) => {
    if (stats[statName] > 0) {
      setStats(prev => ({ ...prev, [statName]: prev[statName] - 1 }));
      setAvailablePoints(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    // Apply all stats to the character
    Object.entries(stats).forEach(([stat, value]) => {
      updateStat(stat as keyof typeof stats, value);
    });
    
    // Proceed to next step
    onComplete();
  };

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
        <p className="text-center">剩餘點數: <span className="font-bold text-xl">{availablePoints}</span></p>
      </div>

      <div className="space-y-4">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center justify-between">
            <span className="w-24">{getStatName(stat)}:</span>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm"
                onClick={() => handleDecrement(stat as keyof typeof stats)}
                disabled={value <= 0}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Minus size={16} />
              </Button>
              
              <span className="w-8 text-center">{value}</span>
              
              <Button 
                size="sm"
                onClick={() => handleIncrement(stat as keyof typeof stats)}
                disabled={availablePoints <= 0}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button 
          onClick={handleComplete}
          disabled={availablePoints > 0}
          className="w-full max-w-xs"
        >
          完成分配
        </Button>
      </div>
    </div>
  );
};

export default 屬性點分配;
