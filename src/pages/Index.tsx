
import React from 'react';
import { GameProvider } from '../context/GameContext';
import 遊戲容器 from '../components/遊戲容器';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <GameProvider>
        <div className="w-full h-screen max-w-md mx-auto overflow-hidden">
          <遊戲容器 />
        </div>
      </GameProvider>
    </div>
  );
};

export default Index;
