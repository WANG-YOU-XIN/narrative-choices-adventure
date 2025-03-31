
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User, UserRound } from 'lucide-react';

interface CharacterDetailsFormProps {
  name: string;
  gender: 'male' | 'female';
  onNameChange: (name: string) => void;
  onGenderChange: (gender: 'male' | 'female') => void;
  onSubmit: (e: React.FormEvent) => void;
  remainingPoints: number;
}

const 角色詳細資料表單: React.FC<CharacterDetailsFormProps> = ({
  name,
  gender,
  onNameChange,
  onGenderChange,
  onSubmit,
  remainingPoints
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full h-1/2 p-4 flex flex-col bg-opacity-30 bg-gray-900 rounded-lg border border-game-border mt-4">
      <div className="mb-4">
        <Label htmlFor="name" className="block text-game-text mb-2">角色姓名</Label>
        <Input
          id="name"
          className="bg-gray-800 border-gray-700 text-white"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-4">
        <p className="text-game-text mb-2">性別選擇</p>
        <RadioGroup 
          className="flex justify-center gap-6"
          value={gender} 
          onValueChange={(value) => onGenderChange(value as 'male' | 'female')}
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
  );
};

export default 角色詳細資料表單;
