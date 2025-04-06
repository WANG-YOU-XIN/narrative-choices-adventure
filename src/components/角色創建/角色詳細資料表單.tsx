
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dice1 } from 'lucide-react';

interface 角色詳細資料表單Props {
  name: string;
  onNameChange: (newName: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  remainingPoints: number;
}

const 角色詳細資料表單: React.FC<角色詳細資料表單Props> = ({ 
  name, 
  onNameChange, 
  onSubmit, 
  remainingPoints 
}) => {
  // Generate a random Chinese name
  const generateRandomName = () => {
    const firstNames = ['李', '王', '張', '劉', '陳', '楊', '趙', '黃', '周', '吳', 
                        '徐', '孫', '朱', '馬', '胡', '郭', '林', '何', '高', '梁', 
                        '鄭', '羅', '宋', '謝', '唐', '韓', '曹', '許', '鄧', '蕭',
                        '馮', '曾', '程', '蔡', '彭', '潘', '袁', '於', '董', '余',
                        '蘇', '葉', '呂', '魏', '蔣', '田', '杜', '丁', '沈', '姜'];
    
    const secondNames = ['偉', '強', '磊', '洋', '勇', '軍', '傑', '濤', '超', '明', 
                        '剛', '平', '輝', '東', '輝', '華', '健', '亮', '志', '杰', 
                        '俊', '敏', '靜', '潔', '艷', '麗', '娟', '敏', '靜', '秀',
                        '娜', '莉', '霞', '紅', '萍', '芳', '欣', '怡', '雯', '婷',
                        '媛', '琳', '雪', '靖', '琦', '晨', '天', '瀚', '明', '哲'];
    
    const thirdNames = ['', '軒', '宇', '浩', '皓', '天', '文', '明', '子', '博', 
                       '達', '雲', '翔', '華', '欣', '如', '瑤', '月', '悅', '恆'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const secondName = secondNames[Math.floor(Math.random() * secondNames.length)];
    const useThirdName = Math.random() > 0.5;
    const thirdName = useThirdName ? thirdNames[Math.floor(Math.random() * thirdNames.length)] : '';
    
    onNameChange(firstName + secondName + thirdName);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">角色資料</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              id="name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="輸入你的名字"
              className="flex-1"
            />
            <Button 
              type="button"
              onClick={generateRandomName} 
              className="bg-white text-black hover:bg-gray-200 p-2"
              title="隨機生成名字"
            >
              <Dice1 size={20} />
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <Button type="submit" className="w-full" disabled={name.trim() === '' || remainingPoints > 0}>
            開始遊戲
          </Button>
        </div>
      </form>
    </div>
  );
};

export default 角色詳細資料表單;
