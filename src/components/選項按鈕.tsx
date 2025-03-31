
import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getStoryNode, getItem, checkConstitution } from '../data/storyData';
import { Button } from '@/components/ui/button';
import 抓周活動 from './抓周活動';

const 選項按鈕: React.FC = () => {
  const { 
    currentNode, 
    setCurrentNode, 
    addToInventory, 
    updateStat, 
    increaseAge, 
    characterName, 
    characterStats, 
    isGameOver 
  } = useGame();

  useEffect(() => {
    // Check if we're on the check_constitution node
    if (currentNode.id === 'check_constitution') {
      // Check if constitution is less than 2 and run random check
      const canContinue = checkConstitution(characterStats.constitution);
      
      if (!canContinue) {
        // If check fails, skip to year_two
        const nextNode = getStoryNode('year_two');
        setCurrentNode(nextNode);
        increaseAge(1); // Increase age since we're skipping to year 2
      }
    }
  }, [currentNode.id, characterStats.constitution, setCurrentNode, increaseAge]);

  // Don't render choices if game is over
  if (isGameOver) {
    return null;
  }

  // Replace placeholder text with character name in story text
  let displayText = currentNode.text;
  if (characterName) {
    displayText = displayText.replace('你', characterName);
  }

  // 檢查是否是抓周節點
  if (currentNode.id === 'zhuazhou') {
    return <抓周活動 />;
  }

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

export default 選項按鈕;
