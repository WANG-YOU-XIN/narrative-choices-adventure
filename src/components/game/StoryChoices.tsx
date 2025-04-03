
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '@/components/ui/button';
import { getStoryNode, getItem } from '../../data/storyData';
import { toast } from "@/hooks/use-toast";

const StoryChoices: React.FC = () => {
  const { 
    currentNode, 
    setCurrentNode, 
    addToInventory, 
    updateStat, 
    increaseAge 
  } = useGame();

  // Helper function to show toast notifications for stat changes
  const showStatChangeToast = (statName: string, value: number) => {
    const statDisplayNames: Record<string, string> = {
      'attack': '攻擊',
      'constitution': '體質',
      'agility': '敏捷',
      'charm': '魅力',
      'intelligence': '智力',
      'speed': '速度',
      'health': '生命'
    };

    const displayName = statDisplayNames[statName] || statName;
    const changeText = value > 0 ? `+${value}` : value;
    const toastType = value > 0 ? '提升' : '降低';
    
    toast({
      title: `${displayName}${toastType}`,
      description: `${displayName}值${toastType}了 ${Math.abs(value)} 點`,
      variant: value > 0 ? "default" : "destructive",
    });
  };

  const handleChoice = (choiceIndex: number) => {
    const choice = currentNode.choices[choiceIndex];
    
    // Handle any effects from the choice
    if (choice.effect) {
      const { type, itemId, statName, value, ageChange } = choice.effect;
      
      if (type === 'addItem' && itemId) {
        const item = getItem(itemId);
        if (item) {
          addToInventory(item);
          // If item has a stat effect, apply it
          if (item.effect && item.effect.statName && item.effect.value) {
            updateStat(item.effect.statName, item.effect.value);
            // Show toast notification for stat change
            showStatChangeToast(item.effect.statName, item.effect.value);
          }
        }
      } else if (type === 'updateStat' && statName && value) {
        updateStat(statName, value);
        // Show toast notification for stat change
        showStatChangeToast(statName, value);
      }
      
      // Handle age progression
      if (ageChange && ageChange > 0) {
        increaseAge(ageChange);
      }
    }
    
    // Navigate to the next node
    const nextNode = getStoryNode(choice.nextNode);
    setCurrentNode(nextNode);
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      {currentNode.choices.map((choice, index) => (
        <Button
          key={index}
          className="choice-button w-full text-lg py-4 bg-game-primary hover:bg-game-accent text-white"
          onClick={() => handleChoice(index)}
        >
          {choice.text}
        </Button>
      ))}
    </div>
  );
};

export default StoryChoices;
