
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StoryNode, InventoryItem, CharacterStats, DeathCondition } from '../types/game.types';
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
  isGameOver: boolean;
  deathReason: string | null;
  resetGame: () => void;
}

const defaultStats: CharacterStats = {
  attack: 5,
  constitution: 5,
  agility: 5,
  defense: 5,  // Changed from physique to defense
  intelligence: 5,
  speed: 7,
  health: 25
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentNode, setCurrentNode] = useState<StoryNode>(initialStory);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [characterStats, setCharacterStats] = useState<CharacterStats>(defaultStats);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterGender, setCharacterGender] = useState<'male' | 'female'>('male');
  const [characterAge, setCharacterAge] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [deathReason, setDeathReason] = useState<string | null>(null);

  const addToInventory = (item: InventoryItem) => {
    if (inventory.length < 15) {
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
    setCharacterAge(0);
    setCurrentNode(initialStory);
    setIsGameOver(false);
    setDeathReason(null);
    setInventory([]);
    setCharacterStats(defaultStats);
  };

 const checkDeathConditions = (age: number): boolean => {
    let isDead = false;
    
    // 檢查體質是否小於等於 2
    if (characterStats.constitution <= 2) {
        const random = Math.floor(Math.random() * 100) + 1;
        
        if (age === 1 && random <= 90) {
            setDeathReason("體弱多病，夭折死亡");
            isDead = true;
        }
    }
    
    // 檢查智力是否小於等於 2（且還沒死）
    if (!isDead && characterStats.intelligence <= 2) {
        const random = Math.floor(Math.random() * 100) + 1;
        
        if (age === 1 && random <= 90) {
            setDeathReason("大腦萎縮，夭折死亡");
            isDead = true;
        }
    }
    
    return isDead;
};


  const increaseAge = (years: number) => {
    const newAge = characterAge + years;
    setCharacterAge(newAge);
    
    // Check for death conditions
    const isDead = checkDeathConditions(newAge);
    if (isDead) {
      setIsGameOver(true);
    }
    
    // Update health based on age (only if still alive)
    if (!isDead && newAge <= 15) {
      const scaledHealth = 25 + Math.floor((newAge / 15) * 75);
      if (scaledHealth > characterStats.health) {
        setCharacterStats(prev => ({
          ...prev,
          health: scaledHealth
        }));
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setIsGameOver(false);
    setDeathReason(null);
    setCharacterAge(0);
    setCharacterStats(defaultStats);
    setInventory([]);
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
        increaseAge,
        isGameOver,
        deathReason,
        resetGame
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
