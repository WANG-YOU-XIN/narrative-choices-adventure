
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
  initialConstitution: number;
}

const defaultStats: CharacterStats = {
  attack: 0,
  constitution: 0,
  agility: 0,
  charm: 0,  // Changed from defense to charm
  intelligence: 0,
  speed: 1.0, // Changed from 7 to 1.0
  health: 0  // Changed from 25 to 0, will be calculated based on constitution
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
  const [initialConstitution, setInitialConstitution] = useState(0);

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
    setCharacterStats(prev => {
      const newStats = { ...prev };
      
      newStats[statName] = prev[statName] + value;
      
      // If constitution is updated, also update health (10 points per constitution)
      if (statName === 'constitution') {
        newStats.health = newStats.constitution * 10;
        // Update initial constitution if the game hasn't started yet
        if (!gameStarted) {
          setInitialConstitution(newStats.constitution);
        }
      }
      
      console.log("Updated Stats:", newStats);
      return newStats;
    });
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
    
    // Set initial constitution based on current constitution
    setInitialConstitution(characterStats.constitution);
    
    // Set health based on constitution (10 points per constitution)
    setCharacterStats(prev => ({
      ...prev,
      health: prev.constitution * 10
    }));
  };

  const checkDeathConditions = (age: number): boolean => {
    let isDead = false;
    
    // 只在1歲時檢查死亡條件
    if (age === 1) {
      console.log("Checking death conditions at age 1");
      console.log("Current stats:", characterStats);
      
      // 檢查體質是否小於等於 2
      if (characterStats.constitution <= 2) {
        const random = Math.floor(Math.random() * 100) + 1;
        console.log(`Constitution check: ${characterStats.constitution} <= 2, random: ${random}`);
        
        if (random <= 90) {
          setDeathReason("體弱多病，夭折死亡");
          isDead = true;
          console.log("Death by constitution");
        }
      }
      
      // 如果沒有因為體質而死亡，檢查智力是否小於等於 2
      if (!isDead && characterStats.intelligence <= 2) {
        const random = Math.floor(Math.random() * 100) + 1;
        console.log(`Intelligence check: ${characterStats.intelligence} <= 2, random: ${random}`);
        
        if (random <= 90) {
          setDeathReason("大腦萎縮，夭折死亡");
          isDead = true;
          console.log("Death by intelligence");
        }
      }
    }
    
    return isDead;
  };

  const increaseAge = (years: number) => {
    const newAge = characterAge + years;
    setCharacterAge(newAge);
    
    console.log(`Age increased to ${newAge}, checking death conditions...`);
    
    // Check for death conditions
    const isDead = checkDeathConditions(newAge);
    if (isDead) {
      console.log("Game over due to death condition");
      setIsGameOver(true);
    } else {
      console.log("Survived death check");
      
      // Increase health based on initial constitution
      if (!isDead) {
        setCharacterStats(prev => ({
          ...prev,
          health: prev.health + initialConstitution
        }));
        console.log(`Health increased by ${initialConstitution} to ${characterStats.health + initialConstitution}`);
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
    setInitialConstitution(0);
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
        resetGame,
        initialConstitution
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
