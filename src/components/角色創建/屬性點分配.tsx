
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface StatPointAllocationProps {
  stats: {
    attack: number;
    constitution: number;
    agility: number;
    physique: number;
    intelligence: number;
  };
  remainingPoints: number;
  onStatChange: (stat: keyof typeof stats, value: number) => void;
}

const 屬性點分配: React.FC<StatPointAllocationProps> = ({ 
  stats, 
  remainingPoints, 
  onStatChange 
}) => {
  return (
    <div className="w-full h-1/2 p-4 flex flex-col bg-opacity-30 bg-gray-900 rounded-lg border border-game-border">
      <h2 className="text-xl text-center mb-2 text-game-text">角色屬性點數分配</h2>
      <p className="text-game-text text-center mb-4">剩餘點數: {remainingPoints}</p>
      
      <div className="grid grid-cols-3 gap-4 my-4">
        {/* Attack stat */}
        <div className="flex flex-col items-center">
          <span className="text-game-text">攻擊</span>
          <div className="flex items-center mt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('attack', -1)}
              disabled={stats.attack <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-game-text text-lg font-bold">{stats.attack}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('attack', 1)}
              disabled={remainingPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Constitution stat */}
        <div className="flex flex-col items-center">
          <span className="text-game-text">體質</span>
          <div className="flex items-center mt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('constitution', -1)}
              disabled={stats.constitution <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-game-text text-lg font-bold">{stats.constitution}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('constitution', 1)}
              disabled={remainingPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Agility stat */}
        <div className="flex flex-col items-center">
          <span className="text-game-text">敏捷</span>
          <div className="flex items-center mt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('agility', -1)}
              disabled={stats.agility <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-game-text text-lg font-bold">{stats.agility}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('agility', 1)}
              disabled={remainingPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Physique stat */}
        <div className="flex flex-col items-center mt-3">
          <span className="text-game-text">體格</span>
          <div className="flex items-center mt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('physique', -1)}
              disabled={stats.physique <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-game-text text-lg font-bold">{stats.physique}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('physique', 1)}
              disabled={remainingPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Intelligence stat */}
        <div className="flex flex-col items-center mt-3">
          <span className="text-game-text">智力</span>
          <div className="flex items-center mt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('intelligence', -1)}
              disabled={stats.intelligence <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-game-text text-lg font-bold">{stats.intelligence}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8" 
              onClick={() => onStatChange('intelligence', 1)}
              disabled={remainingPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-around mt-4">
        <div className="text-game-text">
          <span className="font-medium">攻速:</span> 7 (固定)
        </div>
        <div className="text-game-text">
          <span className="font-medium">血量:</span> 25 (固定)
        </div>
      </div>
    </div>
  );
};

export default 屬性點分配;
