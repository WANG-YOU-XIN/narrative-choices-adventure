
import { InventoryItem } from '../types/game.types';

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

export const getItem = (itemId: string): InventoryItem | undefined => {
  return gameItems[itemId];
};
