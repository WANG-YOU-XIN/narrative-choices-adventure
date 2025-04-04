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
  const isScenarioLoadedRef = useRef(false);
  
  // Track node types
  const [isAgeProgressionNode, setIsAgeProgressionNode] = useState(false);
  const [isConstitutionCheckNode, setIsConstitutionCheckNode] = useState(false);
  
  // This effect sets up node type flags and handles constitution check
  useEffect(() => {
    // Update node type tracking states
    setIsAgeProgressionNode(currentNode.id === 'age_progression');
    setIsConstitutionCheckNode(currentNode.id === 'check_constitution');

    // Only reset states when changing to a node that's not age_progression
    if (currentNode.id !== 'age_progression') {
      hasProcessedAgeRef.current = false;
      isScenarioLoadedRef.current = false;
      
      // Don't reset the current scenario when just toggling inventory
      // Only reset when actually changing nodes
      if (!isScenarioLoadedRef.current) {
        currentScenarioRef.current = null;
        setShowScenarioChoices(false);
      }
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

  // This effect handles loading scenarios only once
  useEffect(() => {
    // Only process age scenarios when on age_progression node, 
    // only do it once via ref, and don't re-process if we've already loaded a scenario
    if (isAgeProgressionNode && !hasProcessedAgeRef.current && !isScenarioLoadedRef.current) {
      // Check if we already have a stored scenario for this age in localStorage
      const storageKey = `scenario_age_${characterAge}`;
      const storedScenario = localStorage.getItem(storageKey);
      
      if (storedScenario) {
        // Use the stored scenario
        try {
          const parsedScenario = JSON.parse(storedScenario);
          currentScenarioRef.current = parsedScenario;
          isScenarioLoadedRef.current = true;
          
          // If scenario has choices, show them
          if (parsedScenario.choices && parsedScenario.choices.length > 0) {
            setShowScenarioChoices(true);
          }
          
          // Update the story text with stored scenario
          const updatedNode = { 
            ...currentNode, 
            text: `【年齡：${characterAge}歲】\n${parsedScenario.text}`
          };
          
          setCurrentNode(updatedNode);
        } catch (e) {
          console.error("Failed to parse stored scenario:", e);
          // If parsing fails, get a new scenario
          getAndSetNewScenario();
        }
      } else {
        // Get a new random scenario
        getAndSetNewScenario();
      }
      
      hasProcessedAgeRef.current = true;
    }
  }, [isAgeProgressionNode, characterAge, currentNode]);
  
  // Helper function to get and set a new scenario
  const getAndSetNewScenario = () => {
    const scenario = getRandomScenarioForAge(characterAge);
    
    if (scenario) {
      // Save to ref and localStorage for persistence
      currentScenarioRef.current = scenario;
      isScenarioLoadedRef.current = true;
      
      const storageKey = `scenario_age_${characterAge}`;
      localStorage.setItem(storageKey, JSON.stringify(scenario));
      
      // If scenario has choices, show them instead of applying effect immediately
      if (scenario.choices && scenario.choices.length > 0) {
        setShowScenarioChoices(true);
      }
      
      // Update the story text to include the scenario
      const updatedNode = { 
        ...currentNode, 
        text: `【年齡：${characterAge}歲】\n${scenario.text}`
      };
      
      setCurrentNode(updatedNode);
    }
  };

  // Reset scenario states helper function
  const resetScenario = () => {
    hasProcessedAgeRef.current = false;
    isScenarioLoadedRef.current = false;
    
    // Keep the current scenario when just resetting for next age
    // Only clear it when actually changing to next year
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

  // If we're at age_progression and have processed the age scenario, 
  // show a "Next Year" button to proceed to the next year
  if (isAgeProgressionNode && hasProcessedAgeRef.current) {
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
