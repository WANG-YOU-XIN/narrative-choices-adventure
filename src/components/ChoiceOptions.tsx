
import React from 'react';
import { useGame } from '../context/GameContext';
import { getStoryNode, getItem } from '../data/storyData';
import { Button } from '@/components/ui/button';

const ChoiceOptions: React.FC = () => {
  const { currentNode, setCurrentNode, addToInventory, updateStat, increaseAge } = useGame();

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
          }
        }
      } else if (type === 'updateStat' && statName && value) {
        updateStat(statName, value);
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

export default ChoiceOptions;
