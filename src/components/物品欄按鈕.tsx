
import React from 'react';
import { Button } from '@/components/ui/button';
import { Backpack } from 'lucide-react';
import { useGame } from '../context/GameContext';

const 物品欄按鈕: React.FC = () => {
  const { toggleInventory } = useGame();

  // Make sure toggleInventory only toggles the inventory state and doesn't affect the scenario
  const handleInventoryToggle = (e: React.MouseEvent) => {
    // Prevent the event from propagating up and potentially affecting other components
    e.stopPropagation();
    toggleInventory();
  };

  return (
    <Button 
      onClick={handleInventoryToggle} 
      className="absolute bottom-4 right-4 rounded-full w-14 h-14 flex items-center justify-center bg-game-primary hover:bg-game-accent"
    >
      <Backpack className="w-7 h-7" />
    </Button>
  );
};

export default 物品欄按鈕;
