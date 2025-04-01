
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
    text: '你選擇了碰碰車。雖然還小，但在父母的協助下，你體��了碰撞的刺激和快���。',
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
        nextNode: 'years_4_to_5',
        effect: {
          type: 'updateStat',
          ageChange: 2
        }
      }
    ]
  },
  
  // 新增的劇情節點
  'years_4_to_5': {
    id: 'years_4_to_5',
    text: '時光飛逝，轉眼間你已經六歲了。童年生活多姿多彩。',
    choices: [
      {
        text: '繼續故事',
        nextNode: 'age_6_animal',
        effect: {
          type: 'updateStat',
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 11【年齡：6歲】受傷的小動物
  'age_6_animal': {
    id: 'age_6_animal',
    text: '你發現了一隻受傷的小動物，決定幫助它。',
    choices: [
      {
        text: '小心翼翼地照顧它，學習如何治療傷口',
        nextNode: 'age_7_weekend',
        effect: {
          type: 'updateStat',
          statName: 'intelligence',
          value: 1,
          ageChange: 1
        }
      },
      {
        text: '逗弄它，試圖與它培養感情',
        nextNode: 'age_7_weekend',
        effect: {
          type: 'updateStat',
          statName: 'charm',
          value: 1,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 6【年齡：7歲】週末活動
  'age_7_weekend': {
    id: 'age_7_weekend',
    text: '週末時，家人帶你到圖書館與公園活動，你需要選擇如何度過這一天。',
    choices: [
      {
        text: '選擇閱讀知識書籍，吸收更多新知識',
        nextNode: 'age_8_challenge',
        effect: {
          type: 'updateStat',
          statName: 'intelligence',
          value: 1,
          ageChange: 1
        }
      },
      {
        text: '在公園裡奔跑遊玩，鍛煉自己的體能',
        nextNode: 'age_8_challenge',
        effect: {
          type: 'updateStat',
          statName: 'constitution',
          value: 1,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 1【年齡：8歲】益智挑戰賽
  'age_8_challenge': {
    id: 'age_8_challenge',
    text: '學校舉辦益智挑戰賽，你站在台前，看著台下的老師與同學，心跳加速。這場比賽不僅考驗你的智慧，還需要一定的反應速度。',
    choices: [
      {
        text: '全神貫注於解題，仔細分析每道題目',
        nextNode: 'age_9_adventure',
        effect: {
          type: 'updateStat',
          statName: 'intelligence',
          value: 2,
          ageChange: 1
        }
      },
      {
        text: '快速思考並靈活應對，以速度取勝',
        nextNode: 'age_9_adventure',
        effect: {
          type: 'updateStat',
          statName: 'agility',
          value: 1,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 7【年齡：9歲】校園探險
  'age_9_adventure': {
    id: 'age_9_adventure',
    text: '一次校園探險活動，你發現了一本舊書或一條神秘的線索，內心充滿好奇。',
    choices: [
      {
        text: '研究書中的武術內容，模仿其中的招式',
        nextNode: 'age_9_game_strategy',
        effect: {
          type: 'updateStat',
          statName: 'attack',
          value: 1
        }
      },
      {
        text: '深入分析線索，嘗試解開其中的奧秘',
        nextNode: 'age_9_game_strategy',
        effect: {
          type: 'updateStat',
          statName: 'intelligence',
          value: 2
        }
      }
    ]
  },
  
  // 劇情 12【年齡：9歲】遊戲策略
  'age_9_game_strategy': {
    id: 'age_9_game_strategy',
    text: '在遊戲中，你需要選擇不同的策略來獲勝。',
    choices: [
      {
        text: '靠智慧規劃最佳策略',
        nextNode: 'age_10_martial_arts',
        effect: {
          type: 'updateStat',
          statName: 'intelligence',
          value: 1,
          ageChange: 1
        }
      },
      {
        text: '依靠反應速度來取勝',
        nextNode: 'age_10_martial_arts',
        effect: {
          type: 'updateStat',
          statName: 'agility',
          value: 1,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 2【年齡：10歲】武術社團
  'age_10_martial_arts': {
    id: 'age_10_martial_arts',
    text: '你參加了武術社團，今天的訓練內容是基礎格鬥技巧與體能鍛煉，教練要求大家挑選不同的訓練重點。',
    choices: [
      {
        text: '專注於學習攻擊技巧，加強拳法與踢擊',
        nextNode: 'age_10_class_leader',
        effect: {
          type: 'updateStat',
          statName: 'attack',
          value: 1
        }
      },
      {
        text: '持續進行體能訓練，提高耐力與肌肉強度',
        nextNode: 'age_10_class_leader',
        effect: {
          type: 'updateStat',
          statName: 'constitution',
          value: 2
        }
      }
    ]
  },
  
  // 劇情 10【年齡：10歲】班級負責人
  'age_10_class_leader': {
    id: 'age_10_class_leader',
    text: '班級需要選出一名負責人來帶領團隊，你有機會爭取這個位置。',
    choices: [
      {
        text: '以良好的社交能力與風範說服同學支持你',
        nextNode: 'age_11_debate',
        effect: {
          type: 'updateStat',
          statName: 'charm',
          value: 1,
          ageChange: 1
        }
      },
      {
        text: '制定完善的計畫，展現你的決策能力',
        nextNode: 'age_11_debate',
        effect: {
          type: 'updateStat',
          statName: 'intelligence',
          value: 2,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 3【年齡：11歲】班級辯論
  'age_11_debate': {
    id: 'age_11_debate',
    text: '班級辯論比賽即將開始，你站在隊伍中，思考著該如何應對對手的發言。',
    choices: [
      {
        text: '仔細分析論點，準備強而有力的反駁',
        nextNode: 'age_12_martial_contest',
        effect: {
          type: 'updateStat',
          statName: 'intelligence',
          value: 1,
          ageChange: 1
        }
      },
      {
        text: '放鬆心情，以自信的語氣表達自己的觀點',
        nextNode: 'age_12_martial_contest',
        effect: {
          type: 'updateStat',
          statName: 'charm',
          value: 1,
          ageChange: 1
        }
      },
      {
        text: '在答辯時靈活應變，快速思考最佳應對方式',
        nextNode: 'age_12_martial_contest',
        effect: {
          type: 'updateStat',
          statName: 'agility',
          value: 1,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 4【年齡：12歲】校際武術比賽
  'age_12_martial_contest': {
    id: 'age_12_martial_contest',
    text: '你參加了校際武術比賽，站在擂台上，對手正虎視眈眈地盯著你。',
    choices: [
      {
        text: '集中火力，發揮最強攻擊力壓制對手',
        nextNode: 'age_13_outdoor_camp',
        effect: {
          type: 'updateStat',
          statName: 'attack',
          value: 2,
          ageChange: 1
        }
      },
      {
        text: '依靠靈活的身手，不斷迴避對手攻勢',
        nextNode: 'age_13_outdoor_camp',
        effect: {
          type: 'updateStat',
          statName: 'agility',
          value: 2,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 5【年齡：13歲】戶外拓展營
  'age_13_outdoor_camp': {
    id: 'age_13_outdoor_camp',
    text: '學校組織了一場戶外拓展營，這是一個結合體能與社交能力的挑戰。',
    choices: [
      {
        text: '積極參與體能挑戰，鍛煉自己的身體素質',
        nextNode: 'age_14_sports',
        effect: {
          type: 'updateStat',
          statName: 'constitution',
          value: 1,
          ageChange: 1
        }
      },
      {
        text: '主動帶領隊友，展現自己的領導魅力',
        nextNode: 'age_14_sports',
        effect: {
          type: 'updateStat',
          statName: 'charm',
          value: 2,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 8【年齡：14歲】全校體育競賽
  'age_14_sports': {
    id: 'age_14_sports',
    text: '全校體育競賽正在進行，你即將參加決賽，這是一次展現你的機會。',
    choices: [
      {
        text: '發揮身體優勢，全力爭取第一名',
        nextNode: 'age_15_interschool',
        effect: {
          type: 'updateStat',
          statName: 'agility',
          value: 2,
          ageChange: 1
        }
      },
      {
        text: '在頒獎時自信地發表感言，吸引眾人目光',
        nextNode: 'age_15_interschool',
        effect: {
          type: 'updateStat',
          statName: 'charm',
          value: 1,
          ageChange: 1
        }
      }
    ]
  },
  
  // 劇情 9【年齡：15歲】校際比賽
  'age_15_interschool': {
    id: 'age_15_interschool',
    text: '一場校際比賽，你需要發揮自身的長處，決定如何應戰。',
    choices: [
      {
        text: '全力進攻，以氣勢壓制對手',
        nextNode: 'start',
        effect: {
          type: 'updateStat',
          statName: 'attack',
          value: 1
        }
      },
      {
        text: '強化體能，確保比賽過程中不易疲勞',
        nextNode: 'start',
        effect: {
          type: 'updateStat',
          statName: 'constitution',
          value: 1
        }
      },
      {
        text: '靠靈活身法閃避攻擊，尋找機會反擊',
        nextNode: 'start',
        effect: {
          type: 'updateStat',
          statName: 'agility',
          value: 1
        }
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
