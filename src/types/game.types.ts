
export interface StoryNode {
  id: string;
  text: string;
  choices: Choice[];
}

export interface Choice {
  text: string;
  nextNode: string;
  effect?: Effect;
}

export interface Effect {
  type: 'addItem' | 'removeItem' | 'updateStat';
  itemId?: string;
  statName?: keyof CharacterStats;
  value?: number;
  ageChange?: number;  // Added to track age changes
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon?: string;
  effect?: {
    statName: keyof CharacterStats;
    value: number;
  };
}

export interface CharacterStats {
  attack: number;    // 攻擊
  constitution: number; // 體質
  agility: number;   // 敏捷
  charm: number;     // 魅力 (changed from defense)
  intelligence: number; // 智力
  speed: number;     // 攻速 (unchanged)
  health: number;    // 血量 (unchanged)
}

// New interface for death condition
export interface DeathCondition {
  type: 'constitution' | 'intelligence';
  age: number;
  message: string;
}
