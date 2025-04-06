
import React from 'react';
import { useGame } from '../context/GameContext';

const 角色簡易圖: React.FC = () => {
  const { characterName, characterGender, characterAge } = useGame();

  return (
    <div className="w-full h-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border flex flex-col items-center justify-center relative">
      {/* 年齡顯示 */}
      <div className="absolute top-3 left-0 w-full text-center">
        <span className="text-game-text text-lg font-bold">年齡: {characterAge}</span>
      </div>
      
      {/* 角色頭像 (火柴人) */}
      <div className="flex flex-col items-center justify-center mb-4">
        {/* Head */}
        <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-1">
          {/* Face */}
          <div className="relative w-10 h-6">
            {/* Eyes */}
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white"></div>
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white"></div>
            {/* Smile */}
            <div className="absolute bottom-0 left-2 w-6 h-2 border-b-2 border-white rounded-b-full"></div>
          </div>
        </div>
        {/* Body */}
        <div className="w-1 h-14 bg-white"></div>
        {/* Arms */}
        <div className="relative w-12 h-1">
          <div className="absolute top-[-14px] left-0 w-12 h-1 bg-white transform -rotate-30"></div>
          <div className="absolute top-[-14px] right-0 w-12 h-1 bg-white transform rotate-30"></div>
        </div>
        {/* Legs */}
        <div className="relative w-12 h-12">
          <div className="absolute top-[-2px] left-1 w-1 h-12 bg-white transform -rotate-15"></div>
          <div className="absolute top-[-2px] right-1 w-1 h-12 bg-white transform rotate-15"></div>
        </div>
      </div>
      
      {/* 角色名稱 */}
      <h3 className="text-xl text-black font-bold">{characterName}</h3>
    </div>
  );
};

export default 角色簡易圖;
