
import React, { useEffect, useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { getStoryNode, checkConstitution, getRandomScenarioForAge, isMultiChoiceScenario, isSingleChoiceScenario } from '../data/storyData';
import { AgeScenario } from '../data/ageScenarios';
import { SingleChoiceScenario } from '../data/singleChoiceScenarios';
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

  // Use ref to maintain current scenario state
  const currentScenarioRef = useRef<AgeScenario | SingleChoiceScenario | null>(null);
  const [showScenarioChoices, setShowScenarioChoices] = useState(false);
  const [showNextYearButton, setShowNextYearButton] = useState(false);
  
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

    // If we're on a custom age node, extract the scenario
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
            
            // Determine which UI to show based on scenario type
            if (isMultiChoiceScenario(parsedScenario)) {
              setShowScenarioChoices(true);
              setShowNextYearButton(false);
            } else {
              // For single-choice scenarios, show the next year button
              setShowScenarioChoices(false);
              setShowNextYearButton(true);
            }
          } catch (e) {
            console.error("Failed to parse stored scenario:", e);
          }
        }
      }
    }
    
    // Reset states when changing to a node that's not age_progression or custom_age
    if (!isAgeProg && !isCustomAge) {
      // Don't reset the current scenario when just toggling inventory
      if (!isInventoryOpen) {
        currentScenarioRef.current = null;
        setShowScenarioChoices(false);
        setShowNextYearButton(false);
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
    // Only process age scenarios when on age_progression node
    if (isAgeProgressionNode) {
      console.log(`Processing age scenario for age ${characterAge}`);
      
      // Load the next age scenario
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
      }
    }
  }, [isAgeProgressionNode, characterAge, setCurrentNode]);
  
  // Reset scenario states helper function
  const resetScenario = () => {
    currentScenarioRef.current = null;
    setShowScenarioChoices(false);
    setShowNextYearButton(false);
    
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
  if (showScenarioChoices && currentScenarioRef.current && isMultiChoiceScenario(currentScenarioRef.current)) {
    return (
      <ScenarioChoices 
        currentAgeScenario={currentScenarioRef.current} 
        onChoiceSelected={() => setShowScenarioChoices(false)} 
      />
    );
  }

  // If we're at a custom_age node with a single-choice scenario,
  // show a "Next Year" button to proceed to the next year
  if (showNextYearButton && currentScenarioRef.current && isSingleChoiceScenario(currentScenarioRef.current)) {
    return (
      <NextYearButton 
        currentScenario={currentScenarioRef.current} 
        resetScenario={resetScenario} 
      />
    );
  }

  // Regular choice buttons for story nodes
  return <StoryChoices />;
};

export default 選項按鈕;
