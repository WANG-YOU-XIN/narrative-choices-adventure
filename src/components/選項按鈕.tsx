
import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { getStoryNode, checkConstitution, getRandomScenarioForAge } from '../data/storyData';
import { AgeScenario } from '../data/ageScenarios';
import 抓周活動 from './抓周活動';

// Import our new components
import ScenarioChoices from './game/ScenarioChoices';
import NextYearButton from './game/NextYearButton';
import StoryChoices from './game/StoryChoices';

const 選項按鈕: React.FC = () => {
  const { 
    currentNode, 
    setCurrentNode, 
    increaseAge, 
    characterName, 
    characterStats,
    characterAge,
    isGameOver,
    isInventoryOpen
  } = useGame();

  const [hasProcessedAge, setHasProcessedAge] = useState(false);
  const [currentAgeScenario, setCurrentAgeScenario] = useState<AgeScenario | null>(null);
  const [showScenarioChoices, setShowScenarioChoices] = useState(false);
  const [isRandomScenarioLoaded, setIsRandomScenarioLoaded] = useState(false);

  // Use a separate state to track if we're on the age_progression node
  const [isAgeProgressionNode, setIsAgeProgressionNode] = useState(false);
  const [isConstitutionCheckNode, setIsConstitutionCheckNode] = useState(false);

  useEffect(() => {
    // Update node type tracking states
    setIsAgeProgressionNode(currentNode.id === 'age_progression');
    setIsConstitutionCheckNode(currentNode.id === 'check_constitution');

    // Only reset states when changing to a node that's not age_progression
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
  }, [currentNode.id, characterStats.constitution]);

  // Separate useEffect for handling random age scenarios to prevent re-triggering
  useEffect(() => {
    // Only process age scenarios when on age_progression node and inventory is not open
    if (isAgeProgressionNode && !hasProcessedAge && !isRandomScenarioLoaded && !isInventoryOpen) {
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
  }, [
    isAgeProgressionNode, 
    characterAge, 
    hasProcessedAge, 
    isRandomScenarioLoaded, 
    isInventoryOpen, 
    currentNode
  ]);

  // Reset scenario states helper function
  const resetScenario = () => {
    setHasProcessedAge(false);
    setIsRandomScenarioLoaded(false);
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
      <ScenarioChoices 
        currentAgeScenario={currentAgeScenario} 
        onChoiceSelected={() => setShowScenarioChoices(false)} 
      />
    );
  }

  // If we're at age_progression and have processed the age scenario, 
  // show a "Next Year" button to proceed to the next year
  if (isAgeProgressionNode && hasProcessedAge) {
    return (
      <NextYearButton 
        currentAgeScenario={currentAgeScenario} 
        resetScenario={resetScenario} 
      />
    );
  }

  // Regular choice buttons for story nodes
  return <StoryChoices />;
};

export default 選項按鈕;
