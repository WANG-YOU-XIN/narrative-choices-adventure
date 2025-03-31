import { StoryNode, InventoryItem } from '../types/game.types';

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

export const zhuaZhouItems = [
  { id: 'book', name: '書本', talent: '學術', icon: '📚' },
  { id: 'pen', name: '筆', talent: '文學', icon: '✒️' },
  { id: 'abacus', name: '算盤', talent: '數學', icon: '🧮' },
  { id: 'money', name: '錢幣', talent: '財富', icon: '💰' },
  { id: 'rice', name: '米', talent: '不愁吃穿', icon: '🍚' },
  { id: 'ruler', name: '尺', talent: '工程', icon: '📏' },
  { id: 'scissors', name: '剪刀', talent: '手工藝', icon: '✂️' },
  { id: 'paint', name: '顏料', talent: '藝術', icon: '🎨' },
  { id: 'ball', name: '球', talent: '運動', icon: '⚽' },
  { id: 'medicine', name: '藥', talent: '醫學', icon: '💊' },
  { id: 'microphone', name: '麥克風', talent: '音樂', icon: '🎤' },
  { id: 'shield', name: '盾牌', talent: '軍事', icon: '🛡️' },
  { id: 'computer', name: '電腦', talent: '科技', icon: '💻' },
  { id: 'plant', name: '植物', talent: '農業', icon: '🌱' },
  { id: 'crown', name: '皇冠', talent: '領導', icon: '👑' }
];

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
        nextNode: 'year_two',
        effect: {
          type: 'updateStat',
          ageChange: 1
        }
      }
    ]
  },
  'year_two': {
    id: 'year_two',
    text: '你已經兩歲了，大部分時間都在睡覺和吃飯。今天，你感到有點困了。',
    choices: [
      {
        text: '睡覺',
        nextNode: 'year_three',
        effect: {
          type: 'updateStat',
          ageChange: 1
        }
      }
    ]
  },
  'year_three': {
    id: 'year_three',
    text: '你已經三歲了！今天，你的家人決定帶你去遊樂園玩。在那裡，你想要玩什麼？',
    choices: [
      {
        text: '旋轉木馬',
        nextNode: 'carousel',
      },
      {
        text: '摩天輪',
        nextNode: 'ferris_wheel',
      },
      {
        text: '碰碰車',
        nextNode: 'bumper_cars',
      }
    ]
  },
  'carousel': {
    id: 'carousel',
    text: '你選擇了旋轉木馬。坐在華麗的木馬上，隨著音樂上下起伏，你感到無比快樂。',
    choices: [
      {
        text: '回家',
        nextNode: 'after_amusement_park',
        effect: {
          type: 'updateStat',
          ageChange: 1
        }
      }
    ]
  },
  'ferris_wheel': {
    id: 'ferris_wheel',
    text: '你選擇了摩天輪。在高處，你看到了整個遊樂園的美景，這讓你充滿了對世界的好奇。',
    choices: [
      {
        text: '回家',
        nextNode: 'after_amusement_park',
        effect: {
          type: 'updateStat',
          ageChange: 1
        }
      }
    ]
  },
  'bumper_cars': {
    id: 'bumper_cars',
    text: '你選擇了碰碰車。雖然還小，但在父母的協助下，你體驗了碰撞的刺激和快���。',
    choices: [
      {
        text: '回家',
        nextNode: 'after_amusement_park',
        effect: {
          type: 'updateStat',
          ageChange: 1
        }
      }
    ]
  },
  'after_amusement_park': {
    id: 'after_amusement_park',
    text: '遊樂園的一天結束了，你在回家的路上睡著了。這是個美好的一天。',
    choices: [
      {
        text: '繼續故事',
        nextNode: 'start',
      }
    ]
  }
};

export const gameItems: Record<string, InventoryItem> = {
  'key': {
    id: 'key',
    name: '鑰匙',
    description: '一把舊鐵鑰匙，可以打開房間的門。',
    icon: '🔑'
  },
  'knife': {
    id: 'knife',
    name: '小刀',
    description: '一把鋒利的小刀，提升攻擊力。',
    icon: '🔪',
    effect: {
      statName: 'attack',
      value: 5
    }
  },
  'potion': {
    id: 'potion',
    name: '藥水',
    description: '一瓶紅色藥水，可以恢復生命值。',
    icon: '🧪',
    effect: {
      statName: 'health',
      value: 20
    }
  },
  'shield': {
    id: 'shield',
    name: '盾牌',
    description: '一面堅固的盾牌，提升防禦力。',
    icon: '🛡️',
    effect: {
      statName: 'defense',
      value: 8
    }
  },
  'boots': {
    id: 'boots',
    name: '輕盈靴',
    description: '一雙輕盈的靴子，提升敏捷。',
    icon: '👢',
    effect: {
      statName: 'agility',
      value: 6
    }
  }
};

export const getStoryNode = (nodeId: string): StoryNode => {
  return storyNodes[nodeId] || initialStory;
};

export const getItem = (itemId: string): InventoryItem | undefined => {
  return gameItems[itemId];
};

export const getRandomZhuaZhouItems = (count: number = 3): any[] => {
  const shuffled = [...zhuaZhouItems];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};

export const checkConstitution = (constitution: number): boolean => {
  if (constitution < 2) {
    // Generate random number between 1-100
    const random = Math.floor(Math.random() * 100) + 1;
    // If number is less than 10, continue to zhuazhou (10% chance)
    return random <= 10;
  }
  // Always continue if constitution >= 2
  return true;
};
