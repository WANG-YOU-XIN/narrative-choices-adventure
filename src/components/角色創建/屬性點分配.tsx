import React from 'react';
import { Button } from "@/components/ui/button";
import { useGame } from '../context/GameContext';

const AttributeAllocation: React.FC = () => {
  const { characterStats, updateStat } = useGame();

  const attributes: { key: keyof typeof characterStats; label: string }[] = [
    { key: "attack", label: "攻擊" },
    { key: "constitution", label: "體質" },
    { key: "agility", label: "敏捷" },
    { key: "defense", label: "防禦" },
    { key: "intelligence", label: "智力" },
  ];

  return (
    <div className="p-4 bg-gray-900 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4 text-center">屬性點分配</h2>
      <div className="space-y-4">
        {attributes.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span>{label}: {characterStats[key]}</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => updateStat(key, -1)}
                disabled={characterStats[key] <= 0}
              >
                -
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => updateStat(key, 1)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default 屬性點分配;
