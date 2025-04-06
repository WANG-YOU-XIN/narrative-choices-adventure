
import React from 'react';
import { GameProvider } from './context/GameContext';
import 遊戲容器 from './components/遊戲容器';
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-full h-screen max-w-md mx-auto overflow-hidden">
          <遊戲容器 />
        </div>
        <Toaster position="top-center" richColors closeButton />
      </div>
    </GameProvider>
  );
};

export default App;
