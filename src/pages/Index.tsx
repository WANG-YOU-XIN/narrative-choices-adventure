
import React from 'react';
import { GameProvider } from '../context/GameContext';
import GameContainer from '../components/GameContainer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <GameProvider>
        <div className="w-full h-screen max-w-md mx-auto overflow-hidden">
          <GameContainer />
        </div>
      </GameProvider>
    </div>
  );
};

export default Index;
