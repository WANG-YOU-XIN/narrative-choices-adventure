
import React from 'react';
import { useGame } from '../context/GameContext';
import { UserRound, User } from 'lucide-react';

const 角色面板: React.FC = () => {
  const { characterName, characterGender, characterAge, characterStats } = useGame();

  const statLabels: Record<string, string> = {
    attack: '攻擊',
    constitution: '體質',
    agility: '敏捷',
    charm: '魅力',
    intelligence: '智力',
    speed: '攻速',
    health: '血量'
  };

  return (
    <div className="w-full h-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border flex flex-col items-center">
      {/* 角色圖示 */}
      <div className="text-6xl mb-2">
        {characterGender === 'male' ? <User size={64} /> : <UserRound size={64} />}
      </div>
      
      {/* 角色名稱與年齡 */}
      <h3 className="text-xl text-game-text font-bold mt-2">{characterName}</h3>
      <p className="text-game-text mt-1">年齡: {characterAge}</p>

      {/* 屬性顯示 */}
      <div className="mt-4 w-full">
        {Object.entries(characterStats).map(([key, value]) => (
          <div key={key} className="flex justify-between text-game-text font-medium">
            <span>{statLabels[key] ?? key}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default 角色面板;
