
import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { getStoryNode, getItem, checkConstitution, getRandomScenarioForAge } from '../data/storyData';
import { Button } from '@/components/ui/button';
import 抓周活動 from './抓周活動';
import { AgeScenario } from '../data/ageScenarios';
import { toast } from "@/hooks/use-toast";

const 選項按鈕: React.FC = () => {
  const { 
    currentNode, 
    setCurrentNode, 
    addToInventory, 
    updateStat, 
    increaseAge, 
    characterName, 
    characterStats,
    characterAge,
    isGameOver 
  } = useGame();
  const [hasProcessedAge, setHasProcessedAge] = useState(false);
  const [currentAgeScenario, setCurrentAgeScenario] = useState<AgeScenario | null>(null);
  const [showScenarioChoices, setShowScenarioChoices] = useState(false);
  const [isRandomScenarioLoaded, setIsRandomScenarioLoaded] = useState(false);

  useEffect(() => {
    // Reset states when node changes (except for age_progression)
    if (currentNode.id !== 'age_progression') {
      setHasProcessedAge(false);
      setCurrentAgeScenario(null);
      setShowScenarioChoices(false);
      setIsRandomScenarioLoaded(false);
    }

    // Check if we're on the check_constitution node
    if (currentNode.id === 'check_constitution') {
      // Check if constitution is less than or equal to 2 and run random check
      const canContinue = checkConstitution(characterStats.constitution);
      
      if (!canContinue) {
        // If check fails, skip to age_progression
        const nextNode = getStoryNode('age_progression');
        setCurrentNode(nextNode);
        increaseAge(1); // Increase age since we're skipping ahead
      }
    }
    
    // Handle random age scenarios when on age_progression node and not already processed
    if (currentNode.id === 'age_progression' && !hasProcessedAge && !isRandomScenarioLoaded) {
      // Get a random scenario for the current age if available
      const scenario = getRandomScenarioForAge(characterAge);
      
      if (scenario) {
        setCurrentAgeScenario(scenario);
        setIsRandomScenarioLoaded(true);
        
        // If scenario has choices, show them instead of applying effect immediately
        if (scenario.choices && scenario.choices.length > 0) {
          setShowScenarioChoices(true);
          
          // Update the story text to include the scenario
          const updatedNode = { 
            ...currentNode, 
            text: `【年齡：${characterAge}歲】\n${scenario.text}`
          };
          
          setCurrentNode(updatedNode);
        } 
        // For regular scenarios (without choices), we'll show the scenario text
        // but delay applying effects until user clicks "Next Year"
        else {
          // Update the story text to include the scenario
          const updatedNode = { 
            ...currentNode, 
            text: `【年齡：${characterAge}歲】\n${scenario.text}`
          };
          
          setCurrentNode(updatedNode);
        }
        
        setHasProcessedAge(true);
      }
    }
  }, [currentNode.id, characterAge, characterStats.constitution, hasProcessedAge, isRandomScenarioLoaded]);

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

  // If we're showing a scenario with multiple choices
  if (showScenarioChoices && currentAgeScenario && currentAgeScenario.choices) {
    return (
      <div className="w-full flex flex-col space-y-4 p-4">
        {currentAgeScenario.choices.map((choice, index) => (
          <Button
            key={index}
            className="choice-button w-full text-lg py-4 bg-game-primary hover:bg-game-accent text-white"
            onClick={() => {
              // Apply the effect from the choice
              if (choice.effect) {
                updateStat(choice.effect.statName, choice.effect.value);
                // Show toast notification for stat change
                showStatChangeToast(choice.effect.statName, choice.effect.value);
              }
              // Hide the choices after selection
              setShowScenarioChoices(false);
            }}
          >
            {choice.text}
          </Button>
        ))}
      </div>
    );
  }

  // If we're at age_progression and have processed the age scenario, 
  // show a "Next Year" button to proceed to the next year
  if (currentNode.id === 'age_progression' && hasProcessedAge) {
    return (
      <div className="w-full flex flex-col space-y-4 p-4">
        <Button
          className="choice-button w-full text-lg py-4 bg-game-primary hover:bg-game-accent text-white"
          onClick={() => {
            // Apply the scenario effect now (for scenarios without choices)
            if (currentAgeScenario && currentAgeScenario.effect && !showScenarioChoices) {
              updateStat(currentAgeScenario.effect.statName, currentAgeScenario.effect.value);
              // Show toast notification for stat change
              showStatChangeToast(currentAgeScenario.effect.statName, currentAgeScenario.effect.value);
            }
            
            increaseAge(1);
            setHasProcessedAge(false);
            setIsRandomScenarioLoaded(false);
            // Reset the current node to trigger a new age scenario
            const nextNode = getStoryNode('age_progression');
            setCurrentNode(nextNode);
          }}
        >
          下一年
        </Button>
      </div>
    );
  }

  // Regular choice buttons for story nodes
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

export default 選項按鈕;
