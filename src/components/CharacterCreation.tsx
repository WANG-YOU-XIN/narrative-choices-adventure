
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useGame } from '../context/GameContext';
import { User, UserRound, Plus, Minus } from 'lucide-react';

const CharacterCreation: React.FC = () => {
  const { startGame, updateStat } = useGame();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [remainingPoints, setRemainingPoints] = useState(10);
  const [stats, setStats] = useState({
    attack: 0,
    defense: 0,
    agility: 0
  });

  const handleStatChange = (stat: 'attack' | 'defense' | 'agility', value: number) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      // If no name, don't proceed
      return;
    }
    
    // Apply stats to the game
    updateStat('attack', stats.attack);
    updateStat('defense', stats.defense);
    updateStat('agility', stats.agility);
    
    // Start the game with character info
    startGame(name, gender);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-1/2 p-4 flex flex-col bg-opacity-30 bg-gray-900 rounded-lg border border-game-border">
        <h2 className="text-xl text-center mb-2 text-game-text">角色屬性點數分配</h2>
        <p className="text-game-text text-center mb-4">剩餘點數: {remainingPoints}</p>
        
        <div className="grid grid-cols-3 gap-4 my-4">
          {/* Attack stat */}
          <div className="flex flex-col items-center">
            <span className="text-game-text">攻擊</span>
            <div className="flex items-center mt-1">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('attack', -1)}
                disabled={stats.attack <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-game-text text-lg font-bold">{stats.attack}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('attack', 1)}
                disabled={remainingPoints <= 0}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Defense stat */}
          <div className="flex flex-col items-center">
            <span className="text-game-text">防禦</span>
            <div className="flex items-center mt-1">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('defense', -1)}
                disabled={stats.defense <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-game-text text-lg font-bold">{stats.defense}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('defense', 1)}
                disabled={remainingPoints <= 0}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Agility stat */}
          <div className="flex flex-col items-center">
            <span className="text-game-text">敏捷</span>
            <div className="flex items-center mt-1">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('agility', -1)}
                disabled={stats.agility <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-game-text text-lg font-bold">{stats.agility}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('agility', 1)}
                disabled={remainingPoints <= 0}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-around mt-4">
          <div className="text-game-text">
            <span className="font-medium">攻速:</span> 1.0 (固定)
          </div>
          <div className="text-game-text">
            <span className="font-medium">血量:</span> 25 (固定)
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full h-1/2 p-4 flex flex-col bg-opacity-30 bg-gray-900 rounded-lg border border-game-border mt-4">
        <div className="mb-4">
          <Label htmlFor="name" className="block text-game-text mb-2">角色姓名</Label>
          <Input
            id="name"
            className="bg-gray-800 border-gray-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <p className="text-game-text mb-2">性別選擇</p>
          <RadioGroup 
            className="flex justify-center gap-6"
            value={gender} 
            onValueChange={(value) => setGender(value as 'male' | 'female')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="male" value="male" />
              <Label htmlFor="male" className="flex items-center gap-1 text-game-text">
                <User size={20} /> 男性
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="female" value="female" />
              <Label htmlFor="female" className="flex items-center gap-1 text-game-text">
                <UserRound size={20} /> 女性
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          type="submit" 
          className="mt-auto w-full py-6 text-lg bg-game-primary hover:bg-game-accent"
          disabled={!name.trim() || remainingPoints > 0}
        >
          開始遊戲
        </Button>
      </form>
    </div>
  );
};

export default CharacterCreation;
