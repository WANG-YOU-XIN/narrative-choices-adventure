
import React from 'react';
import { useGame } from '../context/GameContext';
import StoryDisplay from './StoryDisplay';
import ChoiceOptions from './ChoiceOptions';
import InventoryButton from './InventoryButton';
import InventoryGrid from './InventoryGrid';
import CharacterStats from './CharacterStats';
import CharacterPanel from './CharacterPanel';
import CloseButton from './CloseButton';
import CharacterCreation from './CharacterCreation';
import AgeDisplay from './AgeDisplay';

const GameContainer: React.FC = () => {
  const { isInventoryOpen, gameStarted } = useGame();

  // If game hasn't started, show character creation
  if (!gameStarted) {
    return (
      <div className="flex flex-col w-full h-full max-w-md mx-auto bg-black text-white relative">
        <CharacterCreation />
      </div>
    );
  }

  // Game has started
  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto bg-black text-white relative">
      {!isInventoryOpen ? (
        // Story mode view
        <>
          <div className="flex-1 p-4">
            <AgeDisplay />
            <StoryDisplay />
          </div>
          <div className="p-4 pb-20">
            <ChoiceOptions />
          </div>
          <InventoryButton />
        </>
      ) : (
        // Inventory mode view
        <>
          <div className="flex flex-row h-1/2">
            <div className="w-1/2 p-4">
              <CharacterStats />
            </div>
            <div className="w-1/2 p-4">
              <CharacterPanel />
            </div>
          </div>
          <div className="h-1/2">
            <InventoryGrid />
          </div>
          <CloseButton />
        </>
      )}
    </div>
  );
};

export default GameContainer;
