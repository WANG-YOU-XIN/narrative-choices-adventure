
import { StoryNode, InventoryItem } from '../types/game.types';
import { initialStory, storyNodes, getStoryNode } from './initialStory';
import { zhuaZhouItems, getRandomZhuaZhouItems } from './zhuaZhouItems';
import { 
  ageScenarios, 
  getRandomScenarioForAge as getOriginalScenarioForAge,
  multiChoiceScenarios,
  AgeScenario,
  getRandomMultiChoiceScenario
} from './ageScenarios';
import { gameItems, getItem } from './gameItems';
import { checkConstitution } from './healthUtils';
import { singleChoiceScenarios, getRandomSingleChoiceScenario, SingleChoiceScenario } from './singleChoiceScenarios';

// Determines whether to use a multi-choice or single-choice scenario
// Higher probability (30%) for multi-choice scenarios
const MULTI_CHOICE_PROBABILITY = 0.3;

// Custom getRandomScenarioForAge that selects between multi-choice and single-choice scenarios
export const getRandomScenarioForAge = (age: number): AgeScenario | SingleChoiceScenario | null => {
  // Check if we have both types of scenarios available for this age
  const hasMultiChoice = (multiChoiceScenarios[age] || []).length > 0;
  const hasSingleChoice = (singleChoiceScenarios[age] || []).length > 0;
  
  // If we only have one type, use that
  if (hasMultiChoice && !hasSingleChoice) {
    return getRandomMultiChoiceScenario(age);
  }
  if (!hasMultiChoice && hasSingleChoice) {
    return getRandomSingleChoiceScenario(age);
  }
  
  // If we have both types, decide based on probability
  if (hasMultiChoice && hasSingleChoice) {
    const useMultiChoice = Math.random() < MULTI_CHOICE_PROBABILITY;
    return useMultiChoice 
      ? getRandomMultiChoiceScenario(age) 
      : getRandomSingleChoiceScenario(age);
  }
  
  // If we have neither, return null
  return null;
};

// Helper to check if a scenario is a multi-choice scenario
export const isMultiChoiceScenario = (scenario: any): scenario is AgeScenario => {
  return scenario && scenario.choices && Array.isArray(scenario.choices) && scenario.choices.length > 0;
};

// Helper to check if a scenario is a single-choice scenario
export const isSingleChoiceScenario = (scenario: any): scenario is SingleChoiceScenario => {
  return scenario && !scenario.choices;
};

// Export everything for backward compatibility
export {
  initialStory,
  storyNodes,
  getStoryNode,
  zhuaZhouItems,
  getRandomZhuaZhouItems,
  ageScenarios,
  multiChoiceScenarios,
  singleChoiceScenarios,
  gameItems,
  getItem,
  checkConstitution,
  getRandomSingleChoiceScenario,
  getRandomMultiChoiceScenario
};

// Properly export types with 'export type'
export type { AgeScenarioChoice } from './ageScenarios';
export type { SingleChoiceScenario } from './singleChoiceScenarios';
