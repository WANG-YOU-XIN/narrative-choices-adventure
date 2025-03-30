
import React from 'react';
import { useGame } from '../context/GameContext';
import 故事顯示 from './故事顯示';
import 選項按鈕 from './選項按鈕';
import 物品欄按鈕 from './物品欄按鈕';
import 物品欄 from './物品欄';
import 角色屬性 from './角色屬性';
import 角色面板 from './角色面板';
import 關閉按鈕 from './關閉按鈕';
import CharacterCreation from './CharacterCreation';
import 年齡顯示 from './年齡顯示';

const 遊戲容器: React.FC = () => {
  const { isInventoryOpen, gameStarted } = useGame();

  // If game hasn't started, show character creation
  if (!gameStarted) {
    return (
      <div className="flex flex-col w-full h-full max-w-md mx-auto bg-black text-white relative">
        <CharacterCreation />
      </div>
    );
  }

  // Game has started
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
              <角色面板 />
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
