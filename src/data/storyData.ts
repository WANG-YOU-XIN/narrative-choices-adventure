
import { StoryNode, InventoryItem } from '../types/game.types';

export const initialStory: StoryNode = {
  id: 'start',
  text: '你醒來發現自己身處在一個陌生的房間。昏暗的光線中，你看到門口和一個老舊的衣櫃。你該怎麼做？',
  choices: [
    {
      text: '調查房間',
      nextNode: 'investigate_room'
    },
    {
      text: '嘗試開門',
      nextNode: 'try_door'
    },
    {
      text: '檢查衣櫃',
      nextNode: 'check_wardrobe'
    }
  ]
};

export const storyNodes: Record<string, StoryNode> = {
  'start': initialStory,
  'investigate_room': {
    id: 'investigate_room',
    text: '你環顧四周，發現床頭櫃上有一把鑰匙和一張紙條。紙條上寫著：「離開前，確保你有準備好面對外面的危險。」',
    choices: [
      {
        text: '拿取鑰匙',
        nextNode: 'take_key',
        effect: {
          type: 'addItem',
          itemId: 'key'
        }
      },
      {
        text: '返回',
        nextNode: 'start'
      }
    ]
  },
  'take_key': {
    id: 'take_key',
    text: '你拿起鑰匙，它看起來可以打開這個房間的門。',
    choices: [
      {
        text: '嘗試開門',
        nextNode: 'try_door_with_key'
      },
      {
        text: '檢查衣櫃',
        nextNode: 'check_wardrobe'
      }
    ]
  },
  'try_door': {
    id: 'try_door',
    text: '門被鎖住了，你需要找到鑰匙。',
    choices: [
      {
        text: '調查房間',
        nextNode: 'investigate_room'
      },
      {
        text: '檢查衣櫃',
        nextNode: 'check_wardrobe'
      }
    ]
  },
  'try_door_with_key': {
    id: 'try_door_with_key',
    text: '你用鑰匙打開了門，外面是一條長廊。遠處傳來奇怪的聲音。',
    choices: [
      {
        text: '向聲音方向探索',
        nextNode: 'explore_sound'
      },
      {
        text: '沿著走廊前進',
        nextNode: 'corridor'
      },
      {
        text: '返回房間',
        nextNode: 'start'
      }
    ]
  },
  'check_wardrobe': {
    id: 'check_wardrobe',
    text: '衣櫃裡掛著一些舊衣服，底部有一個小盒子。',
    choices: [
      {
        text: '檢查小盒子',
        nextNode: 'check_box'
      },
      {
        text: '返回',
        nextNode: 'start'
      }
    ]
  },
  'check_box': {
    id: 'check_box',
    text: '你打開小盒子，裡面有一把小刀和一瓶藥水。',
    choices: [
      {
        text: '拿取小刀',
        nextNode: 'take_knife',
        effect: {
          type: 'addItem',
          itemId: 'knife'
        }
      },
      {
        text: '拿取藥水',
        nextNode: 'take_potion',
        effect: {
          type: 'addItem',
          itemId: 'potion'
        }
      },
      {
        text: '返回',
        nextNode: 'check_wardrobe'
      }
    ]
  },
  'take_knife': {
    id: 'take_knife',
    text: '你拿起小刀，感覺自己的攻擊力提升了。',
    choices: [
      {
        text: '拿取藥水',
        nextNode: 'take_potion_after_knife',
        effect: {
          type: 'addItem',
          itemId: 'potion'
        }
      },
      {
        text: '返回房間',
        nextNode: 'start'
      }
    ]
  },
  'take_potion': {
    id: 'take_potion',
    text: '你拿起藥水，它看起來可以恢復一些生命值。',
    choices: [
      {
        text: '拿取小刀',
        nextNode: 'take_knife_after_potion',
        effect: {
          type: 'addItem',
          itemId: 'knife'
        }
      },
      {
        text: '返回房間',
        nextNode: 'start'
      }
    ]
  },
  'take_potion_after_knife': {
    id: 'take_potion_after_knife',
    text: '你同時拿了小刀和藥水，現在可以返回房間了。',
    choices: [
      {
        text: '返回房間',
        nextNode: 'start'
      }
    ]
  },
  'take_knife_after_potion': {
    id: 'take_knife_after_potion',
    text: '你同時拿了藥水和小刀，現在可以返回房間了。',
    choices: [
      {
        text: '返回房間',
        nextNode: 'start'
      }
    ]
  },
  'explore_sound': {
    id: 'explore_sound',
    text: '你小心翼翼地朝聲音方向前進，發現一個戴著斗篷的人影站在走廊盡頭。',
    choices: [
      {
        text: '靠近那個人',
        nextNode: 'approach_figure'
      },
      {
        text: '躲起來觀察',
        nextNode: 'hide_and_watch'
      },
      {
        text: '返回',
        nextNode: 'try_door_with_key'
      }
    ]
  },
  'corridor': {
    id: 'corridor',
    text: '你沿著走廊前進，發現了一扇通往庭院的門和一個通往地下室的樓梯。',
    choices: [
      {
        text: '前往庭院',
        nextNode: 'garden'
      },
      {
        text: '下樓梯',
        nextNode: 'basement'
      },
      {
        text: '返回',
        nextNode: 'try_door_with_key'
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
