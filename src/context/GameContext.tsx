
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
  characterName: string;
  characterGender: 'male' | 'female';
  characterAge: number;
  gameStarted: boolean;
  startGame: (name: string, gender: 'male' | 'female') => void;
  increaseAge: (years: number) => void;
}

const defaultStats: CharacterStats = {
  attack: 10,
  defense: 8,
  agility: 5,
  speed: 7,
  health: 25 // Initial health as per requirements
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentNode, setCurrentNode] = useState<StoryNode>(initialStory);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [characterStats, setCharacterStats] = useState<CharacterStats>(defaultStats);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterGender, setCharacterGender] = useState<'male' | 'female'>('male');
  const [characterAge, setCharacterAge] = useState(0); // Starting at age 0
  const [gameStarted, setGameStarted] = useState(false);

  const addToInventory = (item: InventoryItem) => {
    if (inventory.length < 15) {
      // Check if the item already exists in inventory
      if (!inventory.some(existingItem => existingItem.id === item.id)) {
        setInventory([...inventory, item]);
      }
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

  const startGame = (name: string, gender: 'male' | 'female') => {
    setCharacterName(name);
    setCharacterGender(gender);
    setGameStarted(true);
    setCharacterAge(0); // Start at age 0
    setCurrentNode(initialStory); // 确保从初始节点开始
  };

  const increaseAge = (years: number) => {
    const newAge = characterAge + years;
    setCharacterAge(newAge);
    
    // Health scaling with age until 15 years
    if (newAge <= 15) {
      // Calculate new health based on age
      const scaledHealth = 25 + Math.floor((newAge / 15) * 75);
      // Only update health if it's increasing
      if (scaledHealth > characterStats.health) {
        setCharacterStats(prev => ({
          ...prev,
          health: scaledHealth
        }));
      }
    }
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
        toggleInventory,
        characterName,
        characterGender,
        characterAge,
        gameStarted,
        startGame,
        increaseAge
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
