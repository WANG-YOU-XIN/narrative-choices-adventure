
import React from 'react';
import { useGame } from '../context/GameContext';
import { useToast } from '@/hooks/use-toast';

const 物品欄: React.FC = () => {
  const { inventory, removeFromInventory, characterStats, updateStat } = useGame();
  const { toast } = useToast();

  // Create an array of 15 slots, fill with inventory items where available
  const slots = Array(15).fill(null).map((_, index) => 
    index < inventory.length ? inventory[index] : null
  );

  const handleItemClick = (itemIndex: number) => {
    const item = inventory[itemIndex];
    if (!item) return;

    // Show item details
    toast({
      title: item.name,
      description: item.description,
      duration: 3000,
    });
    
    // If it's a consumable item (like potion), use it and remove from inventory
    if (item.id === 'potion') {
      if (item.effect && item.effect.statName && item.effect.value) {
        updateStat(item.effect.statName, item.effect.value);
        toast({
          title: "使用物品",
          description: `你使用了${item.name}，${item.effect.statName}增加了${item.effect.value}。`,
          duration: 3000,
        });
        removeFromInventory(item.id);
      }
    }
  };

  return (
    <div className="w-full p-4">
      <div className="inventory-grid">
        {slots.map((item, index) => (
          <div 
            key={index}
            className="inventory-slot animate-fade-in"
            onClick={() => item && handleItemClick(index)}
          >
            {item && (
              <div className="flex flex-col items-center">
                <div className="text-2xl">{item.icon}</div>
                <div className="text-xs text-center mt-1">{item.name}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default 物品欄;
