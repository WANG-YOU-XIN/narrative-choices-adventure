
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
  onStatChange: (stat: keyof AttributeProps["stats"], value: number) => void;
}

const AttributeAllocation: React.FC<AttributeProps> = ({ stats, remainingPoints, onStatChange }) => {
  const attributes: { key: keyof typeof stats; label: string }[] = [
    { key: "attack", label: "攻擊" },
    { key: "constitution", label: "體質" },
    { key: "agility", label: "敏捷" },
    { key: "defense", label: "防禦" },
    { key: "intelligence", label: "智力" },
  ];

  return (
    <div className="p-4 bg-gray-900 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4 text-center">屬性點分配</h2>
      <div className="text-center mb-4">
        <span className="text-yellow-400">剩餘點數: {remainingPoints}</span>
      </div>
      
      <div className="space-y-4">
        {attributes.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span>{label}: {stats[key]}</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onStatChange(key, -1)} 
                disabled={stats[key] <= 0}
              >
                -
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onStatChange(key, 1)} 
                disabled={remainingPoints <= 0}
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

export default AttributeAllocation;
