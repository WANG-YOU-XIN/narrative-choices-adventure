
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
  const [remainingPoints, setRemainingPoints] = useState(20); // Changed to 20 initial points
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
          
          {/* Constitution stat */}
          <div className="flex flex-col items-center">
            <span className="text-game-text">體質</span>
            <div className="flex items-center mt-1">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('constitution', -1)}
                disabled={stats.constitution <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-game-text text-lg font-bold">{stats.constitution}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('constitution', 1)}
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

          {/* Physique stat */}
          <div className="flex flex-col items-center mt-3">
            <span className="text-game-text">體格</span>
            <div className="flex items-center mt-1">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('physique', -1)}
                disabled={stats.physique <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-game-text text-lg font-bold">{stats.physique}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('physique', 1)}
                disabled={remainingPoints <= 0}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Intelligence stat */}
          <div className="flex flex-col items-center mt-3">
            <span className="text-game-text">智力</span>
            <div className="flex items-center mt-1">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('intelligence', -1)}
                disabled={stats.intelligence <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-game-text text-lg font-bold">{stats.intelligence}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => handleStatChange('intelligence', 1)}
                disabled={remainingPoints <= 0}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-around mt-4">
          <div className="text-game-text">
            <span className="font-medium">攻速:</span> 7 (固定)
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
              <RadioGroupItem id="male" value="male" className="text-white border-white" />
              <Label htmlFor="male" className="flex items-center gap-1 text-white">
                <User size={20} /> 男性
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="female" value="female" className="text-white border-white" />
              <Label htmlFor="female" className="flex items-center gap-1 text-white">
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
