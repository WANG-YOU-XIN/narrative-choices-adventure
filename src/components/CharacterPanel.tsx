
import React from 'react';
import { useGame } from '../context/GameContext';
import { Male, Female } from 'lucide-react';

const CharacterPanel: React.FC = () => {
  const { characterName, characterGender, characterAge } = useGame();
  
  return (
    <div className="w-full h-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border flex flex-col items-center justify-center">
      <div className="text-6xl mb-2">
        {characterGender === 'male' ? <Male size={64} /> : <Female size={64} />}
      </div>
      <h3 className="text-xl text-game-text font-bold mt-2">{characterName}</h3>
      <p className="text-game-text mt-1">年齡: {characterAge}</p>
    </div>
  );
};

export default CharacterPanel;
