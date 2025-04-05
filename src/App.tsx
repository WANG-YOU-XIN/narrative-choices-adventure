
import React from 'react';
import { GameProvider } from './context/GameContext';
import 遊戲容器 from './components/遊戲容器';
import 遊戲捷徑 from './components/遊戲捷徑';
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full h-screen max-w-md mx-auto overflow-hidden">
          <遊戲容器 />
          <遊戲捷徑 />
        </div>
        <Toaster />
      </div>
    </GameProvider>
  );
};

export default App;
