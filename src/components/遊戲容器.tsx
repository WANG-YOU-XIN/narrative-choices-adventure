
import React from 'react';
import { useGame } from '../context/GameContext';
import 故事顯示 from './故事顯示';
import 選項按鈕 from './選項按鈕';
import 物品欄按鈕 from './物品欄按鈕';
import 物品欄 from './物品欄';
import 角色屬性 from './角色屬性';
import 角色簡易圖 from './角色簡易圖';
import 關閉按鈕 from './關閉按鈕';
import CharacterCreation from './CharacterCreation';
import 年齡顯示 from './年齡顯示';
import GameOver from './GameOver';

const 遊戲容器: React.FC = () => {
  const { isInventoryOpen, gameStarted, isGameOver } = useGame();

  // If game hasn't started, show character creation
  if (!gameStarted) {
    return (
      <div className="flex flex-col w-full h-full max-w-md mx-auto bg-black text-white relative">
        <CharacterCreation />
      </div>
    );
  }

  // If game is over, show death screen
  if (isGameOver) {
    return (
      <div className="flex flex-col w-full h-full max-w-md mx-auto bg-black text-white relative">
        <GameOver />
      </div>
    );
  }

  // Game has started and is not over
  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto bg-black text-white relative">
      {!isInventoryOpen ? (
        // Story mode view
        <>
          <div className="flex-1 p-4">
            <年齡顯示 />
            <故事顯示 />
          </div>
          <div className="p-4 pb-20">
            <選項按鈕 />
          </div>
          <物品欄按鈕 />
        </>
      ) : (
        // Inventory mode view
        <>
          <div className="flex flex-row h-1/2">
            <div className="w-1/2 p-4">
              <角色屬性 />
            </div>
            <div className="w-1/2 p-4">
              <角色簡易圖 />
            </div>
          </div>
          <div className="h-1/2">
            <物品欄 />
          </div>
          <關閉按鈕 />
        </>
      )}
    </div>
  );
};

export default 遊戲容器;
