
import { StoryNode, InventoryItem } from '../types/game.types';
import { initialStory, storyNodes, getStoryNode } from './initialStory';
import { zhuaZhouItems, getRandomZhuaZhouItems } from './zhuaZhouItems';
import { 
  ageScenarios, 
  getRandomScenarioForAge, 
  AgeScenario, 
  AgeScenarioChoice,
  multiChoiceScenarios 
} from './ageScenarios';
import { gameItems, getItem } from './gameItems';
import { checkConstitution } from './healthUtils';

// Re-export everything for backward compatibility
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
  AgeScenario,
  AgeScenarioChoice
};
