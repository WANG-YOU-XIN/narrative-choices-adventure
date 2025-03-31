
import React from 'react';
import { Button } from "@/components/ui/button";

interface AttributeProps {
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

const 屬性點分配: React.FC<AttributeProps> = ({ stats, remainingPoints, onStatChange }) => {
  return (
    <div className="p-4 bg-gray-900 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4 text-center">屬性點分配</h2>
      <div className="text-center mb-4">
        <span className="text-yellow-400">剩餘點數: {remainingPoints}</span>
      </div>
      
      <div className="space-y-4">
        {/* 攻擊 */}
        <div className="flex items-center justify-between">
          <span>攻擊: {stats.attack}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('attack', -1)} 
              disabled={stats.attack <= 0}
            >
              -
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('attack', 1)} 
              disabled={remainingPoints <= 0}
            >
              +
            </Button>
          </div>
        </div>
        
        {/* 體質 */}
        <div className="flex items-center justify-between">
          <span>體質: {stats.constitution}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('constitution', -1)} 
              disabled={stats.constitution <= 0}
            >
              -
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('constitution', 1)} 
              disabled={remainingPoints <= 0}
            >
              +
            </Button>
          </div>
        </div>
        
        {/* 敏捷 */}
        <div className="flex items-center justify-between">
          <span>敏捷: {stats.agility}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('agility', -1)} 
              disabled={stats.agility <= 0}
            >
              -
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('agility', 1)} 
              disabled={remainingPoints <= 0}
            >
              +
            </Button>
          </div>
        </div>
        
        {/* 防禦 */}
        <div className="flex items-center justify-between">
          <span>防禦: {stats.defense}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('defense', -1)} 
              disabled={stats.defense <= 0}
            >
              -
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('defense', 1)} 
              disabled={remainingPoints <= 0}
            >
              +
            </Button>
          </div>
        </div>
        
        {/* 智力 */}
        <div className="flex items-center justify-between">
          <span>智力: {stats.intelligence}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('intelligence', -1)} 
              disabled={stats.intelligence <= 0}
            >
              -
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatChange('intelligence', 1)} 
              disabled={remainingPoints <= 0}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default 屬性點分配;
