
import { StoryNode, InventoryItem } from '../types/game.types';
import { initialStory, storyNodes, getStoryNode } from './initialStory';
import { zhuaZhouItems, getRandomZhuaZhouItems } from './zhuaZhouItems';
import { ageScenarios, getRandomScenarioForAge } from './ageScenarios';
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
  getRandomScenarioForAge,
  gameItems,
  getItem,
  checkConstitution
};
