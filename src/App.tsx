
import React from 'react';
import { GameProvider } from './context/GameContext';
import 遊戲容器 from './components/遊戲容器';
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-full h-screen max-w-md mx-auto overflow-hidden relative">
          <遊戲容器 />
          <Toaster 
            position="bottom-center"
            richColors 
            closeButton
            toastOptions={{
              style: {
                marginBottom: '140px', // Position above the choice buttons area
                animation: 'fade-in 0.3s ease, fade-out 0.3s ease forwards 1.7s',
              },
              duration: 2000,
            }}
          />
        </div>
      </div>
    </GameProvider>
  );
};

export default App;
