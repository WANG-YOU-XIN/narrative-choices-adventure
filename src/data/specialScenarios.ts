import { CharacterStats, InventoryItem } from '../types/game.types';

export interface SpecialScenario {
  id: string;
  title: string;
  text: string;
  buttonText: string;
  ageRequirement: number;
  effect?: {
    statChanges?: Partial<CharacterStats>;
    itemId?: string;
  };
  isViewed?: boolean;
}

// Special items for special scenarios
export const specialItems: Record<string, InventoryItem> = {
  'night_shadow_blade': {
    id: 'night_shadow_blade',
    name: '夜影之刃',
    description: '刻有奇異符號的古劍，據說具有隱藏的神秘力量。',
    effect: {
      statName: 'attack',
      value: 8
    }
  },
  'ethereal_mirror': {
    id: 'ethereal_mirror',
    name: '幽冥鏡',
    description: '鏡面泛著幽藍光澤的古鏡，能映照出隱藏在現實世界中黑暗生物的氣息。',
    effect: {
      statName: 'intelligence',
      value: 8
    }
  }
};

// Define the special scenarios
export const specialScenarios: SpecialScenario[] = [
  {
    id: 'blood_awakening',
    title: '暗血覺醒',
    text: '在一次旅遊中，你意外闖入一座密封的地下室。室內陳設古舊，牆上刻滿了神祕符文。正當你仔細研究這些記錄時，一個密封的血瓶無意中被打破，濃稠猩紅的血液滲入你的傷口。這突如其來的變故令你全身感到一陣劇痛，隨即腦海中似乎湧入了古老智慧，你的智力、敏捷與魅力飆升 +5。',
    buttonText: '這個血瓶，是什麼？',
    ageRequirement: 12,
    effect: {
      statChanges: {
        intelligence: 5,
        agility: 5,
        charm: 5
      }
    }
  },
  {
    id: 'blood_legacy',
    title: '血之遺贈',
    text: '在進入了網路上所說的荒廢城堡後，你無意間發現了一處隱藏的祭壇。祭壇中央擺放著一個雕刻精美的石盒，盒中封存著一瓶散發著幽暗光澤的血液。當你好奇地觸碰石盒時，意外觸發了祭壇上的咒語，濃鬱的血液竟自動流向你的手掌並迅速滲透進體內。這神祕的儀式讓你的力量、體質與魅力分別提升 +5，你感到體內充滿前所未有的戰鬥熱血。',
    buttonText: '這股力量是什麼？這瓶血又是什麼？',
    ageRequirement: 12,
    effect: {
      statChanges: {
        attack: 5,
        constitution: 5,
        charm: 5
      }
    }
  },
  {
    id: 'night_shadow_blade',
    title: '夜影之刃',
    text: '在森林間迷路時，你意外來到一座廢棄宅邸，發現其中有一間密室。在昏暗的燭光下，你發現了一把刻有奇異符號的古劍——「夜影之刃」。你將此特殊物品收入懷中，感受到一股神祕能量悄然附著於身。',
    buttonText: '獲得特殊物品「夜影之刃」',
    ageRequirement: 12,
    effect: {
      itemId: 'night_shadow_blade'
    }
  },
  {
    id: 'ethereal_mirror',
    title: '幽冥鏡',
    text: '你發現路邊攤販的攤位上放著一面鏡面泛著幽藍光澤的古鏡——「幽冥鏡」。具攤販所說，此鏡曾隸屬於古代騎士團，能映照出隱藏在現實世界中黑暗生物的氣息。當你把鏡子帶回家後，你凝視鏡中倒映的影像，忽然覺得彷彿有另一個世界在你眼前展開，揭露出人群中那些神祕莫測的存在。',
    buttonText: '獲得特殊物品「幽冥鏡」',
    ageRequirement: 12,
    effect: {
      itemId: 'ethereal_mirror'
    }
  },
  {
    id: 'point_of_no_return',
    title: '無歸的命運',
    text: '在一次突如其來的混戰中，你身陷騎士團與神祕勢力的激烈衝突。事發當下，你孤立無援，正當你拼命尋找逃生之路時，一道詭異的聲音從黑暗中響起，命令你啟動一個古老儀式。強制性的儀式使你被迫飲下濃烈的詛咒之血，瞬間引發劇烈的身體變化。隨著血液在體內肆意流轉，你的全身力量猛然飆升，所有屬性提升 +5，但同時黑暗力量在你心中紮根，讓你徹底失去人性的掙扎。在恐懼與迷亂中，你被迫舉起武器，殺死了無辜的目擊者，從此無法回頭，註定成為黑暗陣營的一員。',
    buttonText: '我該怎麼做？我該做嗎？這是正確的嗎？沒錯，這是對的，我必須要做，我必須要做……對吧？',
    ageRequirement: 12,
    effect: {
      statChanges: {
        attack: 5,
        constitution: 5,
        agility: 5,
        charm: 5,
        intelligence: 5
      }
    }
  }
];

// Storage key for keeping track of viewed scenarios
const VIEWED_SCENARIOS_KEY = 'viewed_special_scenarios';

// Get scenarios that have been viewed
export const getViewedScenarios = (): string[] => {
  const storedData = localStorage.getItem(VIEWED_SCENARIOS_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// Mark a scenario as viewed
export const markScenarioAsViewed = (scenarioId: string) => {
  const viewedScenarios = getViewedScenarios();
  if (!viewedScenarios.includes(scenarioId)) {
    viewedScenarios.push(scenarioId);
    localStorage.setItem(VIEWED_SCENARIOS_KEY, JSON.stringify(viewedScenarios));
  }
};

// Check if a special scenario should appear (10% chance)
export const shouldSpecialScenarioAppear = (age: number): boolean => {
  // Only check for ages 12 and above
  if (age < 12) return false;
  
  // If we've already seen a special scenario, don't show more
  if (getViewedScenarios().length > 0) return false;
  
  // 10% chance to trigger
  return Math.random() < 0.1;
};

// Get a random special scenario that hasn't been viewed yet
export const getRandomSpecialScenario = (age: number): SpecialScenario | null => {
  if (!shouldSpecialScenarioAppear(age)) return null;
  
  const viewedScenarios = getViewedScenarios();
  const availableScenarios = specialScenarios.filter(
    scenario => scenario.ageRequirement <= age && !viewedScenarios.includes(scenario.id)
  );
  
  if (availableScenarios.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableScenarios.length);
  const selectedScenario = availableScenarios[randomIndex];
  
  return selectedScenario;
};
