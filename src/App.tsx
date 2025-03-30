
import React from 'react';
import { GameProvider } from './context/GameContext';
import 遊戲容器 from './components/遊戲容器';
import 遊戲捷徑 from './components/遊戲捷徑';
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="app-container">
        <遊戲容器 />
        <遊戲捷徑 />
        <Toaster />
      </div>
    </GameProvider>
  );
};

export default App;
