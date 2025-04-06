
import React from 'react';
import { useGame } from '../../context/GameContext';
import { getStoryNode } from '../../data/storyData';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const StoryChoices = () => {
  const { currentNode, setCurrentNode, increaseAge, updateStat } = useGame();

  const handleChoiceClick = (choiceIndex: number) => {
    const choice = currentNode.choices[choiceIndex];
    
    if (choice.nextNode) {
      const nextNode = getStoryNode(choice.nextNode);
      setCurrentNode(nextNode);
    }
    
    // Handle effects if specified
    if (choice.effect) {
      // Handle age change
      if (choice.effect.type === 'updateStat' && choice.effect.ageChange) {
        increaseAge(choice.effect.ageChange);
      }
      
      // Handle stat changes with toast notifications
      if (choice.effect.type === 'updateStat' && choice.effect.statName && choice.effect.value !== undefined) {
        updateStat(choice.effect.statName, choice.effect.value);
        
        // Show toast notification with appropriate styling
        toast(
          `${choice.effect.statName} ${choice.effect.value > 0 ? '增加' : '減少'} ${Math.abs(choice.effect.value)}`,
          {
            className: choice.effect.value < 0 ? "bg-red-500 text-black" : "bg-white text-black",
            duration: 2000, // 2 seconds
          }
        );
      }
      
      // Handle item addition
      if (choice.effect.type === 'addItem' && choice.effect.itemId) {
        toast(
          `獲得物品：${choice.effect.itemId}`,
          {
            className: "bg-white text-black",
            duration: 2000,
          }
        );
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
