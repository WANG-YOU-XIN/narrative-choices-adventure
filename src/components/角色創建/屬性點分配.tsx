
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus } from 'lucide-react';

interface Props {
  stats: {
    attack: number;
    constitution: number;
    agility: number;
    defense: number;
    intelligence: number;
  };
  remainingPoints: number;
  onStatChange: (stat: keyof typeof stats, value: number) => void;
}

const 屬性點分配: React.FC<Props> = ({ stats, remainingPoints, onStatChange }) => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg mb-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-white">屬性點數分配</h2>
        <span className="text-yellow-400">剩餘點數: {remainingPoints}</span>
      </div>
      
      <div className="space-y-4">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center justify-between">
            <span className="text-white capitalize w-24">
              {stat === 'attack' && '攻擊'}
              {stat === 'constitution' && '體質'}
              {stat === 'agility' && '敏捷'}
              {stat === 'defense' && '防禦'}
              {stat === 'intelligence' && '智力'}
            </span>
            
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onStatChange(stat as keyof typeof stats, -1)}
                disabled={value <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="mx-3 text-white min-w-8 text-center">{value}</span>
              
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onStatChange(stat as keyof typeof stats, 1)}
                disabled={remainingPoints <= 0}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default 屬性點分配;
