
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StoryNode, InventoryItem, CharacterStats } from '../types/game.types';
import { initialStory } from '../data/storyData';

interface GameContextType {
  currentNode: StoryNode;
  setCurrentNode: (node: StoryNode) => void;
  inventory: InventoryItem[];
  addToInventory: (item: InventoryItem) => void;
  removeFromInventory: (itemId: string) => void;
  characterStats: CharacterStats;
  updateStat: (statName: keyof CharacterStats, value: number) => void;
  isInventoryOpen: boolean;
  toggleInventory: () => void;
}

const defaultStats: CharacterStats = {
  attack: 10,
  defense: 8,
  agility: 5,
  speed: 7,
  health: 100
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentNode, setCurrentNode] = useState<StoryNode>(initialStory);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [characterStats, setCharacterStats] = useState<CharacterStats>(defaultStats);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const addToInventory = (item: InventoryItem) => {
    if (inventory.length < 15) {
      setInventory([...inventory, item]);
    }
  };

  const removeFromInventory = (itemId: string) => {
    setInventory(inventory.filter(item => item.id !== itemId));
  };

  const updateStat = (statName: keyof CharacterStats, value: number) => {
    setCharacterStats(prev => ({
      ...prev,
      [statName]: prev[statName] + value
    }));
  };

  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  return (
    <GameContext.Provider
      value={{
        currentNode,
        setCurrentNode,
        inventory,
        addToInventory,
        removeFromInventory,
        characterStats,
        updateStat,
        isInventoryOpen,
        toggleInventory
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
