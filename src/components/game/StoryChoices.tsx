
import React from 'react';
import { useGame } from '../../context/GameContext';
import { getStoryNode } from '../../data/storyData';
import { Button } from '@/components/ui/button';

const StoryChoices = () => {
  const { currentNode, setCurrentNode, increaseAge } = useGame();

  const handleChoiceClick = (choiceIndex: number) => {
    const choice = currentNode.choices[choiceIndex];
    
    if (choice.nextNode) {
      const nextNode = getStoryNode(choice.nextNode);
      setCurrentNode(nextNode);
    }
    
    // Handle age change if specified
    if (choice.effect && choice.effect.type === 'updateStat' && choice.effect.ageChange) {
      increaseAge(choice.effect.ageChange);
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
