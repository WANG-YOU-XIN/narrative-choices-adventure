
import React from 'react';
import { useGame } from '../context/GameContext';

const 角色簡易圖: React.FC = () => {
  const { characterName, characterGender, characterAge } = useGame();

  return (
    <div className="w-full h-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border flex flex-col items-center justify-center relative">
      {/* 年齡顯示 - 移至圖上方 */}
      <div className="absolute top-2 left-0 w-full text-center">
        <span className="text-game-text text-lg font-bold">年齡: {characterAge}</span>
      </div>
      
      {/* 角色頭像 - 使用上傳的圖片 */}
      <div className="flex flex-col items-center justify-center mb-4 mt-6">
        <img 
          src="/lovable-uploads/cd10856a-9a2a-4c12-88cc-6089915a9430.png" 
          alt="角色頭像" 
          className="h-32 object-contain"
        />
      </div>
      
      {/* 角色名稱 */}
      <h3 className="text-xl text-black font-bold">{characterName}</h3>
    </div>
  );
};

export default 角色簡易圖;
