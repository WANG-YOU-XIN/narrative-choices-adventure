
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
  attack: number;
  defense: number;
  agility: number;
  speed: number;
  health: number;
}
