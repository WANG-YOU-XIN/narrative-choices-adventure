
import React from 'react';
import { useGame } from '../../context/GameContext';
import { getStoryNode } from '../../data/storyData';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const StoryChoices = () => {
  const { currentNode, setCurrentNode, increaseAge, updateStat } = useGame();
  const { toast } = useToast();

  const handleChoiceClick = (choiceIndex: number) => {
    const choice = currentNode.choices[choiceIndex];
    
    if (choice.nextNode) {
      const nextNode = getStoryNode(choice.nextNode);
      setCurrentNode(nextNode);
    }
    
    // Handle age change if specified
    if (choice.effect && choice.effect.type === 'updateStat') {
      // Handle age change
      if (choice.effect.ageChange) {
        increaseAge(choice.effect.ageChange);
      }
      
      // Handle stat changes with toast notifications
      if (choice.effect.stats) {
        Object.entries(choice.effect.stats).forEach(([stat, value]) => {
          if (value !== 0) {
            // Update the stat
            updateStat(stat as keyof typeof choice.effect.stats, value);
            
            // Show toast notification with appropriate styling
            toast({
              title: `${stat} ${value > 0 ? '增加' : '減少'} ${Math.abs(value)}`,
              variant: value < 0 ? "destructive" : "default",
              className: value < 0 ? "bg-red-500 text-black" : "bg-white text-black",
              duration: 2000, // 2 seconds
            });
          }
        });
      }
      
      // Handle item addition
      if (choice.effect.addItem) {
        toast({
          title: `獲得物品：${choice.effect.addItem.name}`,
          className: "bg-white text-black",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      {currentNode.choices.map((choice, index) => (
        <Button
          key={index}
          className="choice-button w-full py-4 bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 rounded-lg text-left px-4 whitespace-normal break-words"
          onClick={() => handleChoiceClick(index)}
        >
          {choice.text}
        </Button>
      ))}
    </div>
  );
};

export default StoryChoices;
