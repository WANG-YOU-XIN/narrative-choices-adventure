
import React from 'react';
import { useGame } from '../context/GameContext';
import { User, UserRound } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const 角色簡易圖: React.FC = () => {
  const { characterName, characterGender, characterAge } = useGame();

  return (
    <div className="w-full h-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border flex flex-col items-center justify-center relative">
      {/* 年齡顯示 */}
      <div className="absolute top-3 left-0 w-full text-center">
        <span className="text-game-text text-lg font-bold">年齡: {characterAge}</span>
      </div>
      
      {/* 角色頭像 */}
      <Avatar className="w-24 h-24 bg-game-primary mb-4">
        <AvatarFallback className="text-white text-4xl">
          {characterGender === 'male' ? <User size={64} /> : <UserRound size={64} />}
        </AvatarFallback>
      </Avatar>
      
      {/* 角色名稱 */}
      <h3 className="text-xl text-game-text font-bold">{characterName}</h3>
    </div>
  );
};

export default 角色簡易圖;
