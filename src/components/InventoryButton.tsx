
import React from 'react';
import { Button } from '@/components/ui/button';
import { Backpack } from 'lucide-react';
import { useGame } from '../context/GameContext';

const InventoryButton: React.FC = () => {
  const { toggleInventory } = useGame();

  return (
    <Button 
      onClick={toggleInventory} 
      className="absolute bottom-4 right-4 rounded-full w-14 h-14 flex items-center justify-center bg-game-primary hover:bg-game-accent"
    >
      <Backpack className="w-7 h-7" />
    </Button>
  );
};

export default InventoryButton;
