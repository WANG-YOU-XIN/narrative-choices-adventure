
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
        
        // Get stat display name
        const statDisplayNames: Record<string, string> = {
          'attack': '攻擊',
          'constitution': '體質',
          'agility': '敏捷',
          'charm': '魅力',
          'intelligence': '智力'
        };
        
        const displayName = statDisplayNames[choice.effect.statName] || choice.effect.statName;
        const isPositive = choice.effect.value > 0;
        
        // Show toast notification with appropriate styling
        toast(
          `${displayName}${isPositive ? '提升' : '降低'} ${Math.abs(choice.effect.value)} 點`,
          {
            className: isPositive ? "bg-white text-black" : "bg-red-500 text-black",
            duration: 2000,
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
