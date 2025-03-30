
import React from 'react';
import { useGame } from '../context/GameContext';

const 角色屬性: React.FC = () => {
  const { characterStats } = useGame();
  
  const statLabels = {
    attack: '攻擊',
    defense: '防禦',
    agility: '敏捷',
    speed: '攻速',
    health: '血量'
  };

  return (
    <div className="w-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border">
      <h2 className="text-xl text-game-text font-bold mb-4">角色屬性</h2>
      <div className="character-stats">
        {Object.entries(characterStats).map(([key, value]) => (
          <React.Fragment key={key}>
            <div className="text-game-text font-medium">
              {statLabels[key as keyof typeof statLabels]}:
            </div>
            <div className="text-game-text">{value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default 角色屬性;
