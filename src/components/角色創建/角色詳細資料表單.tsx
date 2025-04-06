
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dice1 } from 'lucide-react';

interface CharacterDetailsFormProps {
  name: string;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  remainingPoints: number;
}

// List of Chinese names for random generation
const chineseNames = [
  '李明', '王華', '張偉', '劉芳', '陳傑', '楊秀英', '黃志明',
  '吳雪', '趙剛', '孫麗', '周強', '鄭美', '林俊', '朱嘉',
  '何軍', '高雅', '羅偉', '馬秀', '謝文', '郭明', '胡傑',
  '唐玉', '於峰', '徐芳', '呂康', '蔡雪', '鄧傑', '彭麗',
  '方剛', '曹美', '袁明', '邱芳', '石偉', '姜英', '江濤'
];

const 角色詳細資料表單: React.FC<CharacterDetailsFormProps> = ({
  name,
  onNameChange,
  onSubmit,
  remainingPoints
}) => {
  const generateRandomName = () => {
    const randomIndex = Math.floor(Math.random() * chineseNames.length);
    onNameChange(chineseNames[randomIndex]);
  };

  return (
    <form onSubmit={onSubmit} className="w-full h-1/2 p-4 flex flex-col bg-opacity-30 bg-gray-900 rounded-lg border border-white mt-4">
      <div className="mb-4 flex items-center">
        <div className="flex-1">
          <label htmlFor="name" className="block text-game-text mb-2">角色姓名</label>
          <Input
            id="name"
            className="bg-gray-800 border-gray-700 text-white"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
          />
        </div>
        <div className="ml-2 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={generateRandomName}
            className="border border-white text-white hover:bg-gray-700"
          >
            <Dice1 className="h-6 w-6" />
          </Button>
        </div>
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
