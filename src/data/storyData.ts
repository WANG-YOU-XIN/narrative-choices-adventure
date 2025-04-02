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

export const ageScenarios = {
  2: [
    {
      id: 'age_2_agility',
      text: '蹣跚學步期間，你展現出意外的靈活與平衡感，使得動作反應迅速，敏捷獲得 +2 的顯著提升。',
      effect: {
        statName: 'agility',
        value: 2
      }
    },
    {
      id: 'age_2_charm',
      text: '在與家人互動時，你天生的笑容和親和力吸引了眾人的注意，令你的個人魅力略增 +1。',
      effect: {
        statName: 'charm',
        value: 1
      }
    }
  ],
  3: [
    {
      id: 'age_3_attack',
      text: '與同齡小朋友玩耍中，因身體力量尚未發展成熟，你在模擬爭鬥中顯得較為脆弱，攻擊能力下降 -1。',
      effect: {
        statName: 'attack',
        value: -1
      }
    },
    {
      id: 'age_3_intelligence',
      text: '在語言模仿與環境探索中，你展現出極高的學習速度和理解力，因此智力值提升 +2。',
      effect: {
        statName: 'intelligence',
        value: 2
      }
    }
  ],
  4: [
    {
      id: 'age_4_constitution',
      text: '隨著年齡增長，你開始接觸戶外活動與陽光，體魄逐漸強健，體質獲得 +1 的提升。',
      effect: {
        statName: 'constitution',
        value: 1
      }
    },
    {
      id: 'age_4_agility',
      text: '嘗試學習跑跳過程中，由於協調性尚未完全成熟，偶有跌倒情形，敏捷因此略降 -1。',
      effect: {
        statName: 'agility',
        value: -1
      }
    }
  ],
  5: [
    {
      id: 'age_5_charm',
      text: '在幼兒園中你以真誠和友善贏得同伴喜愛，散發出迷人的個性，魅力大幅提升 +2。',
      effect: {
        statName: 'charm',
        value: 2
      }
    },
    {
      id: 'age_5_attack',
      text: '模仿動畫中英雄動作時，你展現出積極嘗試與冒險精神，使得基本動作力量略增，攻擊 +1。',
      effect: {
        statName: 'attack',
        value: 1
      }
    }
  ],
  6: [
    {
      id: 'age_6_intelligence',
      text: '進入學齡後，你有時因過度依賴直覺而忽略邏輯推理，導致部分學習效率下降，智力調降 -1。',
      effect: {
        statName: 'intelligence',
        value: -1
      }
    },
    {
      id: 'age_6_constitution',
      text: '透過參與體育活動與戶外遊戲，你的身體逐步強健，體能表現顯著改善，體質獲得 +2 的加分。',
      effect: {
        statName: 'constitution',
        value: 2
      }
    }
  ],
  7: [
    {
      id: 'age_7_agility',
      text: '在校園運動中，你不斷挑戰自己，動作逐漸敏捷，反應速度明顯提高，敏捷加值 +1。',
      effect: {
        statName: 'agility',
        value: 1
      }
    },
    {
      id: 'age_7_charm',
      text: '一次與同伴的誤會讓你在情緒表達上顯得笨拙，導致人際互動受到影響，魅力大幅下降 -2。',
      effect: {
        statName: 'charm',
        value: -2
      }
    }
  ],
  8: [
    {
      id: 'age_8_attack',
      text: '參加學校自衛訓練後，你學到了基本格鬥技巧，展現出強烈的進攻意識，攻擊能力提升 +2。',
      effect: {
        statName: 'attack',
        value: 2
      }
    },
    {
      id: 'age_8_intelligence',
      text: '在一次解題活動中，因過分急躁而忽略細節，使得思考過程受阻，智力表現受到 -1 的負面影響。',
      effect: {
        statName: 'intelligence',
        value: -1
      }
    }
  ],
  9: [
    {
      id: 'age_9_constitution',
      text: '在戶外遊戲中意外受小擦傷，使你短期內體能表現略顯疲弱，體質下降 -1。',
      effect: {
        statName: 'constitution',
        value: -1
      }
    },
    {
      id: 'age_9_agility',
      text: '參與校內短跑比賽時，你憑藉敏捷與爆發力奪得佳績，敏捷能力因此獲得大幅提升 +2。',
      effect: {
        statName: 'agility',
        value: 2
      }
    }
  ],
  10: [
    {
      id: 'age_10_charm',
      text: '在校園藝術展上，你獨具創意的表現吸引了師生目光，個人魅力因此提升 +1。',
      effect: {
        statName: 'charm',
        value: 1
      }
    },
    {
      id: 'age_10_attack',
      text: '在模擬對抗遊戲中，由於缺乏實戰經驗，你的攻擊判斷顯得遲疑，攻擊能力大幅減少 -2。',
      effect: {
        statName: 'attack',
        value: -2
      }
    }
  ],
  11: [
    {
      id: 'age_11_intelligence',
      text: '在課堂上你善於發問與探索，使得解決問題的能力逐步提升，智力獲得 +1 加分。',
      effect: {
        statName: 'intelligence',
        value: 1
      }
    },
    {
      id: 'age_11_constitution',
      text: '持續參與體育訓練與校隊活動，使你的身體條件顯著改善，體質因此提升 +2。',
      effect: {
        statName: 'constitution',
        value: 2
      }
    }
  ],
  12: [
    {
      id: 'age_12_agility',
      text: '一次運動比賽中的輕微意外，使你短暫失去部分動作協調性，敏捷受到 -1 的調整。',
      effect: {
        statName: 'agility',
        value: -1
      }
    },
    {
      id: 'age_12_charm',
      text: '在全校演講比賽中，你以自信的台風與流暢表達贏得滿堂喝彩，魅力大幅提升 +2。',
      effect: {
        statName: 'charm',
        value: 2
      }
    }
  ],
  13: [
    {
      id: 'age_13_attack',
      text: '參加校內武術社團訓練後，你掌握了一些基礎攻防技巧，攻擊能力因此略增 +1。',
      effect: {
        statName: 'attack',
        value: 1
      }
    },
    {
      id: 'age_13_intelligence',
      text: '在一次重要考試中，由於壓力過大與臨場發揮失常，導致學習表現大幅下滑，智力調整 -2。',
      effect: {
        statName: 'intelligence',
        value: -2
      }
    }
  ],
  14: [
    {
      id: 'age_14_constitution',
      text: '隨著持續參加長跑與戶外運動，你的耐力與體力逐步提升，體質獲得 +1 的改善。',
      effect: {
        statName: 'constitution',
        value: 1
      }
    },
    {
      id: 'age_14_agility',
      text: '在校際籃球賽中，你憑藉靈活的身手與迅速反應屢建奇功，敏捷能力顯著提升 +2。',
      effect: {
        statName: 'agility',
        value: 2
      }
    }
  ],
  15: [
    {
      id: 'age_15_charm',
      text: '因青春期的情緒波動與溝通誤會，使得你在同儕間的互動出現障礙，個人魅力因此下降 -1。',
      effect: {
        statName: 'charm',
        value: -1
      }
    },
    {
      id: 'age_15_attack',
      text: '在一次競技對抗中，由於缺乏戰略與實戰經驗，你的攻擊動作顯得過於保守，攻擊能力大幅降低 -2。',
      effect: {
        statName: 'attack',
        value: -2
      }
    }
  ]
};

export const getRandomScenarioForAge = (age: number) => {
  if (ageScenarios[age]) {
    const scenarios = ageScenarios[age];
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    return scenarios[randomIndex];
  }
  return null;
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
  // 只檢查體質是否小於等於 2，並根據 10% 的存活率來判定
  if (constitution <= 2) {
    const random = Math.floor(Math.random() * 100) + 1;
    return random <= 10; // 10% 的機率為 true (存活)
  }
  return true; // 體質大於 2 時必定存活
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
    description: '一面堅固的盾牌，提升魅力。',
    icon: '🛡️',
    effect: {
      statName: 'charm',
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
