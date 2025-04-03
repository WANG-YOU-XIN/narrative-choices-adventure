
import { StoryNode, InventoryItem } from '../types/game.types';
import { initialStory, storyNodes, getStoryNode } from './initialStory';
import { zhuaZhouItems, getRandomZhuaZhouItems } from './zhuaZhouItems';
import { 
  ageScenarios, 
  getRandomScenarioForAge, 
  multiChoiceScenarios 
} from './ageScenarios';
import { gameItems, getItem } from './gameItems';
import { checkConstitution } from './healthUtils';

// Increase special scenario probability to 20%
const SPECIAL_SCENARIO_PROBABILITY = 0.2;

// Custom getRandomScenarioForAge with higher probability for special scenarios
export const getRandomScenarioForAge = (age: number): AgeScenario | null => {
  const standardScenarios = ageScenarios[age] || [];
  const specialScenarios = multiChoiceScenarios[age] || [];
  
  // No scenarios available for this age
  if (standardScenarios.length === 0 && specialScenarios.length === 0) {
    return null;
  }
  
  // Decide whether to use a special scenario (20% chance if available)
  const useSpecialScenario = 
    specialScenarios.length > 0 && 
    Math.random() < SPECIAL_SCENARIO_PROBABILITY;
  
  if (useSpecialScenario) {
    // Pick a random special scenario
    const randomIndex = Math.floor(Math.random() * specialScenarios.length);
    return specialScenarios[randomIndex];
  } else if (standardScenarios.length > 0) {
    // Pick a random standard scenario
    const randomIndex = Math.floor(Math.random() * standardScenarios.length);
    return standardScenarios[randomIndex];
  }
  
  // Fallback to special scenarios if standard ones aren't available
  if (specialScenarios.length > 0) {
    const randomIndex = Math.floor(Math.random() * specialScenarios.length);
    return specialScenarios[randomIndex];
  }
  
  return null;
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
  gameItems,
  getItem,
  checkConstitution,
};

// Properly export types with 'export type'
export type { AgeScenario, AgeScenarioChoice } from './ageScenarios';
