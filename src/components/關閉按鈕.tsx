
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useGame } from '../context/GameContext';

const 關閉按鈕: React.FC = () => {
  const { toggleInventory } = useGame();

  return (
    <Button 
      onClick={toggleInventory} 
      className="absolute top-4 right-4 rounded-full w-10 h-10 flex items-center justify-center bg-game-primary hover:bg-game-accent"
      variant="outline"
    >
      <X className="w-6 h-6" />
    </Button>
  );
};

export default 關閉按鈕;
