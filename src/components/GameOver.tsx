
import React from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '@/components/ui/button';
import { Skull } from 'lucide-react';

const GameOver: React.FC = () => {
  const { characterName, characterAge, deathReason, resetGame } = useGame();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-90 p-6 text-center">
      <Skull className="w-20 h-20 text-red-600 mb-6" />
      
      <h1 className="text-3xl font-bold text-white mb-2">遊戲結束</h1>
      <h2 className="text-xl text-gray-300 mb-6">{characterName} 已經死亡</h2>
      
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md mb-8">
        <p className="text-gray-400 mb-2">死亡歲數</p>
        <p className="text-2xl text-white mb-4">{characterAge} 歲</p>
        
        <p className="text-gray-400 mb-2">死亡原因</p>
        <p className="text-xl text-red-400 mb-6">{deathReason}</p>
      </div>
      
      <Button 
        onClick={resetGame}
        className="px-8 py-6 text-lg bg-red-700 hover:bg-red-800 w-full max-w-xs"
      >
        重新再來
      </Button>
    </div>
  );
};

export default GameOver;
