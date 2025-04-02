
import { StoryNode } from '../types/game.types';

export const initialStory: StoryNode = {
  id: 'birth',
  text: '一個由人類所生的嬰兒出生了。你的人生故事即將開始。',
  choices: [
    {
      text: '開始人生旅程',
      nextNode: 'year_one',
      effect: {
        type: 'updateStat',
        ageChange: 1
      }
    }
  ]
};

export const storyNodes: Record<string, StoryNode> = {
  'birth': initialStory,
  'year_one': {
    id: 'year_one',
    text: '在你的第一年，家人為你舉行了抓週儀式。桌上擺放著各種物品，你要選擇一樣，這將決定你未來的天賦。',
    choices: [
      {
        text: '參加抓週儀式',
        nextNode: 'check_constitution'
      }
    ]
  },
  'check_constitution': {
    id: 'check_constitution',
    text: '家人正在為抓週儀式做準備...',
    choices: [
      {
        text: '繼續',
        nextNode: 'zhuazhou'
      }
    ]
  },
  'zhuazhou': {
    id: 'zhuazhou',
    text: '現在是傳統的抓週儀式時刻。你面前擺放著三件物品，你會選擇哪一個？',
    choices: [
      {
        text: '暫時由系統產生',
        nextNode: 'age_progression',
        effect: {
          type: 'updateStat',
          ageChange: 1
        }
      }
    ]
  },
  'age_progression': {
    id: 'age_progression',
    text: '時光飛逝，你的人生正在展開...',
    choices: [
      {
        text: '繼續人生旅程',
        nextNode: 'start',
      }
    ]
  }
};

export const getStoryNode = (nodeId: string): StoryNode => {
  return storyNodes[nodeId] || initialStory;
};
