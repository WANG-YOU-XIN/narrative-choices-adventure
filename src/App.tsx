import React from 'react';
import { GameProvider } from './context/GameContext';
import 遊戲容器 from './components/遊戲容器';
import { Toaster } from "@/components/ui/toaster"

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="app-container">
        <遊戲容器 />
        <Toaster />
      </div>
    </GameProvider>
  );
};

export default App;

