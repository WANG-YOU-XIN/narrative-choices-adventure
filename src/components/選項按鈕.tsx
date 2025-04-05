
import React, { useEffect, useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { getStoryNode, checkConstitution, getRandomScenarioForAge } from '../data/storyData';
import { AgeScenario } from '../data/ageScenarios';
import 抓周活動 from './抓周活動';

// Import our components
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

  // Use refs to maintain state between renders
  const hasProcessedAgeRef = useRef(false);
  const currentScenarioRef = useRef<AgeScenario | null>(null);
  const [showScenarioChoices, setShowScenarioChoices] = useState(false);
  
  // Track node types
  const [isAgeProgressionNode, setIsAgeProgressionNode] = useState(false);
  const [isConstitutionCheckNode, setIsConstitutionCheckNode] = useState(false);
  const [isCustomAgeNode, setIsCustomAgeNode] = useState(false);
  
  // This effect sets up node type flags and handles constitution check
  useEffect(() => {
    // Update node type tracking states
    const isAgeProg = currentNode.id === 'age_progression';
    const isCustomAge = currentNode.id.startsWith('custom_age_');
    
    setIsAgeProgressionNode(isAgeProg);
    setIsCustomAgeNode(isCustomAge);
    setIsConstitutionCheckNode(currentNode.id === 'check_constitution');

    // Reset the flags if we moved to a new age_progression node
    if (isAgeProg) {
      hasProcessedAgeRef.current = false;
    }
    
    // If we're on a custom age node, let's extract the scenario
    if (isCustomAge && !isInventoryOpen) {
      const ageMatch = currentNode.id.match(/custom_age_(\d+)/);
      if (ageMatch && ageMatch[1]) {
        const age = parseInt(ageMatch[1], 10);
        const storageKey = `scenario_age_${age}`;
        const storedScenario = localStorage.getItem(storageKey);
        
        if (storedScenario) {
          try {
            const parsedScenario = JSON.parse(storedScenario);
            currentScenarioRef.current = parsedScenario;
            
            // If scenario has choices, show them
            if (parsedScenario.choices && parsedScenario.choices.length > 0) {
              setShowScenarioChoices(true);
              hasProcessedAgeRef.current = false; // Reset so we don't show the NextYearButton
            } else {
              // If no choices, mark as processed so we show the next year button
              hasProcessedAgeRef.current = true;
            }
          } catch (e) {
            console.error("Failed to parse stored scenario:", e);
          }
        }
      }
    }
    
    // Only reset states when changing to a node that's not age_progression or custom_age
    if (!isAgeProg && !isCustomAge) {
      hasProcessedAgeRef.current = false;
      
      // Don't reset the current scenario when just toggling inventory
      if (!isInventoryOpen) {
        currentScenarioRef.current = null;
        setShowScenarioChoices(false);
      }
    }

    // Check if we're on the check_constitution node
    if (currentNode.id === 'check_constitution') {
      // Check if constitution is less than or equal to 2 and run random check
      const canContinue = checkConstitution(characterStats.constitution);
      
      if (!canContinue) {
        // If check fails, directly load the next age scenario instead of going to age_progression
        const newAge = characterAge + 1;
        const newScenario = getRandomScenarioForAge(newAge);
        
        if (newScenario) {
          // Store the new scenario in localStorage
          const newStorageKey = `scenario_age_${newAge}`;
          localStorage.setItem(newStorageKey, JSON.stringify(newScenario));
          
          // Create a custom node with the scenario text
          const customNode = {
            id: `custom_age_${newAge}`,
            text: `【年齡：${newAge}歲】\n${newScenario.text}`,
            choices: []  // Empty choices since we'll handle them in the 選項按鈕 component
          };
          
          // Set the current node to our custom node with the scenario text
          setCurrentNode(customNode);
          increaseAge(1); // Increase age since we're skipping ahead
        }
      }
    }
  }, [currentNode.id, characterStats.constitution, isInventoryOpen]);

  // This effect handles loading scenarios only for age_progression nodes
  useEffect(() => {
    // Only process age scenarios when on age_progression node and hasn't been processed yet
    if (isAgeProgressionNode && !hasProcessedAgeRef.current) {
      console.log(`Processing age scenario for age ${characterAge}`);
      
      // Instead of updating the current node, directly load the next age scenario
      const newScenario = getRandomScenarioForAge(characterAge);
      
      if (newScenario) {
        // Save to ref and localStorage for persistence
        currentScenarioRef.current = newScenario;
        
        const storageKey = `scenario_age_${characterAge}`;
        localStorage.setItem(storageKey, JSON.stringify(newScenario));
        
        // Create a custom node with the scenario text
        const customNode = {
          id: `custom_age_${characterAge}`,
          text: `【年齡：${characterAge}歲】\n${newScenario.text}`,
          choices: []  // Empty choices since we'll handle them in the 選項按鈕 component
        };
        
        // Set the current node to our custom node with the scenario text
        setCurrentNode(customNode);
        
        // If scenario has choices, show them immediately
        if (newScenario.choices && newScenario.choices.length > 0) {
          setShowScenarioChoices(true);
        } else {
          // If no choices, mark as processed so we show the next year button
          hasProcessedAgeRef.current = true;
        }
      }
    }
  }, [isAgeProgressionNode, characterAge, currentNode, isInventoryOpen]);
  
  // Reset scenario states helper function
  const resetScenario = () => {
    hasProcessedAgeRef.current = false;
    currentScenarioRef.current = null;
    
    // Clear from localStorage when moving to next age
    const storageKey = `scenario_age_${characterAge}`;
    localStorage.removeItem(storageKey);
  };

  // Don't render choices if game is over
  if (isGameOver) {
    return null;
  }

  // 檢查是否是抓周節點
  if (currentNode.id === 'zhuazhou') {
    return <抓周活動 />;
  }

  // If we're showing a scenario with multiple choices
  if (showScenarioChoices && currentScenarioRef.current && currentScenarioRef.current.choices) {
    return (
      <ScenarioChoices 
        currentAgeScenario={currentScenarioRef.current} 
        onChoiceSelected={() => setShowScenarioChoices(false)} 
      />
    );
  }

  // If we're at a custom_age node and have processed the age scenario (no choices),
  // show a "Next Year" button to proceed to the next year
  if ((isCustomAgeNode && hasProcessedAgeRef.current) || 
      (isCustomAgeNode && currentScenarioRef.current && 
       (!currentScenarioRef.current.choices || currentScenarioRef.current.choices.length === 0))) {
    return (
      <NextYearButton 
        currentAgeScenario={currentScenarioRef.current} 
        resetScenario={resetScenario} 
      />
    );
  }

  // Regular choice buttons for story nodes
  return <StoryChoices />;
};

export default 選項按鈕;
