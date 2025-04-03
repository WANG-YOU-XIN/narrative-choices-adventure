
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

// Export everything for backward compatibility
export {
  initialStory,
  storyNodes,
  getStoryNode,
  zhuaZhouItems,
  getRandomZhuaZhouItems,
  ageScenarios,
  multiChoiceScenarios,
  getRandomScenarioForAge,
  gameItems,
  getItem,
  checkConstitution,
};

// Properly export types with 'export type'
export type { AgeScenario, AgeScenarioChoice } from './ageScenarios';
