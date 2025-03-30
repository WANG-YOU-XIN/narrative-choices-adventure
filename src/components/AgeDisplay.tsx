
import React from 'react';
import { useGame } from '../context/GameContext';

const AgeDisplay: React.FC = () => {
  const { characterAge } = useGame();
  
  return (
    <div className="absolute top-2 left-2 z-10 bg-gray-900 bg-opacity-70 px-3 py-1 rounded-md text-white border border-game-border">
      <span className="text-sm">歲數: {characterAge}</span>
    </div>
  );
};

export default AgeDisplay;
