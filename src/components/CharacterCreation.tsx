
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import 屬性點分配 from './角色創建/屬性點分配';
import 角色詳細資料表單 from './角色創建/角色詳細資料表單';

const CharacterCreation: React.FC = () => {
  const { startGame, updateStat } = useGame();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [remainingPoints, setRemainingPoints] = useState(20);
  const [stats, setStats] = useState({
    attack: 0,
    constitution: 0,
    agility: 0,
    physique: 0,
    intelligence: 0
  });

  const handleStatChange = (stat: keyof typeof stats, value: number) => {
    // Only allow changes if we have points left or we're decreasing a stat
    if ((remainingPoints > 0 || value < 0) && (stats[stat] > 0 || value > 0)) {
      const newStats = { ...stats };
      newStats[stat] += value;
      
      // Prevent negative stats
      if (newStats[stat] < 0) {
        return;
      }
      
      const newRemainingPoints = remainingPoints - value;
      
      // Only update if we have enough points or we're decreasing a stat
      if (newRemainingPoints >= 0) {
        setStats(newStats);
        setRemainingPoints(newRemainingPoints);
      }
    }
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleGenderChange = (newGender: 'male' | 'female') => {
    setGender(newGender);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      // If no name, don't proceed
      return;
    }
    
    // Apply stats to the game
    Object.entries(stats).forEach(([stat, value]) => {
      updateStat(stat as keyof typeof stats, value);
    });
    
    // Start the game with character info
    startGame(name, gender);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <屬性點分配 
        stats={stats}
        remainingPoints={remainingPoints}
        onStatChange={handleStatChange}
      />
      
      <角色詳細資料表單
        name={name}
        gender={gender}
        onNameChange={handleNameChange}
        onGenderChange={handleGenderChange}
        onSubmit={handleSubmit}
        remainingPoints={remainingPoints}
      />
    </div>
  );
};

export default CharacterCreation;
