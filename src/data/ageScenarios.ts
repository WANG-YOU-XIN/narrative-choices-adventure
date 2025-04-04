
import { CharacterStats } from '../types/game.types';

interface AgeScenarioEffect {
  statName: keyof CharacterStats;
  value: number;
}

export interface AgeScenario {
  id: string;
  text: string;
  age?: number; // Add optional age property
  effect?: {
    statName: keyof CharacterStats;
    value: number;
  };
  choices?: AgeScenarioChoice[];
}

export interface AgeScenarioChoice {
  text: string;
  effect: AgeScenarioEffect;
}

export const ageScenarios: Record<number, AgeScenario[]> = {
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

export const multiChoiceScenarios: Record<number, AgeScenario[]> = {
  2: [
    {
      id: 'age_2_food_choice',
      text: '你剛學會走路，父母製作了美味的飯菜，放在桌上。你會選擇做什麼？',
      choices: [
        {
          text: '自己爬上椅子嘗試拿取食物',
          effect: {
            statName: 'agility',
            value: 2
          }
        },
        {
          text: '用語言表達想吃的意願',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        },
        {
          text: '耐心等待父母喂食',
          effect: {
            statName: 'constitution',
            value: 1
          }
        }
      ]
    }
  ],
  4: [
    {
      id: 'age_4_playtime_choice',
      text: '幼兒園開放日，你可以選擇一個活動參加。你最想參加哪一個？',
      choices: [
        {
          text: '繪畫課程：學習用色彩表達',
          effect: {
            statName: 'charm',
            value: 2
          }
        },
        {
          text: '積木挑戰：建構高塔',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        },
        {
          text: '體育活動：跑跳遊戲',
          effect: {
            statName: 'agility',
            value: 2
          }
        }
      ]
    }
  ],
  6: [
    {
      id: 'age_6_school_choice',
      text: '上學第一天，你走進教室發現同學們已經聚在一起。你會怎麼做？',
      choices: [
        {
          text: '主動介紹自己給大家認識',
          effect: {
            statName: 'charm',
            value: 3
          }
        },
        {
          text: '觀察一下情況再決定',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        },
        {
          text: '加入看起來最有趣的那群同學',
          effect: {
            statName: 'attack',
            value: 1
          }
        }
      ]
    },
    {
      id: 'age_6_weekend_activity',
      text: '【年齡：6歲】 【情境】：週末時，家人帶你到圖書館與公園活動，你需要選擇如何度過這一天。',
      choices: [
        {
          text: '選擇閱讀知識書籍，吸收更多新知識。',
          effect: {
            statName: 'intelligence',
            value: 1
          }
        },
        {
          text: '在公園裡奔跑遊玩，鍛煉自己的體能。',
          effect: {
            statName: 'constitution',
            value: 1
          }
        }
      ]
    }
  ],
  7: [
    {
      id: 'age_7_challenge_choice',
      text: '你參加了一個社區兒童才藝比賽，輪到你上台表演。你會選擇表演什麼？',
      choices: [
        {
          text: '表演唱歌，用美妙的歌聲打動觀眾。',
          effect: {
            statName: 'charm',
            value: 2
          }
        },
        {
          text: '表演跳舞，展現你的活力與節奏感。',
          effect: {
            statName: 'agility',
            value: 2
          }
        },
        {
          text: '表演講故事，用生動的語言吸引大家。',
          effect: {
            statName: 'intelligence',
            value: 1
          }
        }
      ]
    }
  ],
  8: [
    {
      id: 'age_8_challenge_choice',
      text: '課堂上老師提出了一個挑戰，需要同學自願參加。你會怎麼做？',
      choices: [
        {
          text: '迅速舉手，爭取機會',
          effect: {
            statName: 'attack',
            value: 2
          }
        },
        {
          text: '思考策略後再舉手',
          effect: {
            statName: 'intelligence',
            value: 3
          }
        },
        {
          text: '先觀察別人如何應對',
          effect: {
            statName: 'agility',
            value: 1
          }
        }
      ]
    },
    {
      id: 'age_8_quiz_challenge',
      text: '【年齡：8歲】 【情境】：學校舉辦益智挑戰賽，你站在台前，看著台下的老師與同學，心跳加速。這場比賽不僅考驗你的智慧，還需要一定的反應速度。',
      choices: [
        {
          text: '全神貫注於解題，仔細分析每道題目。',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        },
        {
          text: '快速思考並靈活應對，以速度取勝。',
          effect: {
            statName: 'agility',
            value: 1
          }
        }
      ]
    }
  ],
  9: [
    {
      id: 'age_9_school_adventure',
      text: '【年齡：9歲】 【情境】：一次校園探險活動，你發現了一本舊書或一條神秘的線索，內心充滿好奇。',
      choices: [
        {
          text: '研究書中的武術內容，模仿其中的招式。',
          effect: {
            statName: 'attack',
            value: 1
          }
        },
        {
          text: '深入分析線索，嘗試解開其中的奧秘。',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        }
      ]
    },
    {
      id: 'age_9_game_strategy',
      text: '【年齡：9歲】 【情境】：在遊戲中，你需要選擇不同的策略來獲勝。',
      choices: [
        {
          text: '靠智慧規劃最佳策略。',
          effect: {
            statName: 'intelligence',
            value: 1
          }
        },
        {
          text: '依靠反應速度來取勝。',
          effect: {
            statName: 'agility',
            value: 1
          }
        }
      ]
    }
  ],
  10: [
    {
      id: 'age_10_friendship_choice',
      text: '你發現好朋友與另一個同學發生爭執。你會怎麼處理？',
      choices: [
        {
          text: '挺身而出，幫好朋友說話',
          effect: {
            statName: 'attack',
            value: 2
          }
        },
        {
          text: '嘗試調解雙方，尋求和平解決',
          effect: {
            statName: 'charm',
            value: 3
          }
        },
        {
          text: '仔細分析情況，給予客觀建議',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        }
      ]
    },
    {
      id: 'age_10_martial_arts',
      text: '【年齡：10歲】 【情境】：你參加了武術社團，今天的訓練內容是基礎格鬥技巧與體能鍛煉，教練要求大家挑選不同的訓練重點。',
      choices: [
        {
          text: '專注於學習攻擊技巧，加強拳法與踢擊。',
          effect: {
            statName: 'attack',
            value: 1
          }
        },
        {
          text: '持續進行體能訓練，提高耐力與肌肉強度。',
          effect: {
            statName: 'constitution',
            value: 2
          }
        }
      ]
    },
    {
      id: 'age_10_class_leader',
      text: '【年齡：10歲】 【情境】：班級需要選出一名負責人來帶領團隊，你有機會爭取這個位置。',
      choices: [
        {
          text: '以良好的社交能力與風範說服同學支持你。',
          effect: {
            statName: 'charm',
            value: 1
          }
        },
        {
          text: '制定完善的計畫，展現你的決策能力。',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        }
      ]
    }
  ],
  11: [
    {
      id: 'age_11_intelligence_choice',
      text: '你參加了一個學校的科學展覽，你可以選擇一個項目來展示你的才能。你會選擇哪個？',
      choices: [
        {
          text: '設計一個創新的機器人。',
          effect: {
            statName: 'intelligence',
            value: 3
          }
        },
        {
          text: '研究一種新的能源。',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        },
        {
          text: '發明一種新的通訊方式。',
          effect: {
            statName: 'intelligence',
            value: 1
          }
        }
      ]
    },
    {
      id: 'age_11_debate',
      text: '【年齡：11歲】 【情境】：班級辯論比賽即將開始，你站在隊伍中，思考著該如何應對對手的發言。',
      choices: [
        {
          text: '仔細分析論點，準備強而有力的反駁。',
          effect: {
            statName: 'intelligence',
            value: 1
          }
        },
        {
          text: '放鬆心情，以自信的語氣表達自己的觀點。',
          effect: {
            statName: 'charm',
            value: 1
          }
        },
        {
          text: '在答辯時靈活應變，快速思考最佳應對方式。',
          effect: {
            statName: 'agility',
            value: 1
          }
        }
      ]
    },
    {
      id: 'age_11_animal_rescue',
      text: '【年齡：6歲】 【情境】：你發現了一隻受傷的小動物，決定幫助它。',
      choices: [
        {
          text: '小心翼翼地照顧它，學習如何治療傷口。',
          effect: {
            statName: 'intelligence',
            value: 1
          }
        },
        {
          text: '逗弄它，試圖與它培養感情。',
          effect: {
            statName: 'charm',
            value: 1
          }
        }
      ]
    }
  ],
  12: [
    {
      id: 'age_12_hobby_choice',
      text: '你有機會選擇一項課外活動參加。你會選擇什麼？',
      choices: [
        {
          text: '參加體育隊，提升身體素質',
          effect: {
            statName: 'constitution',
            value: 3
          }
        },
        {
          text: '加入科學社，鑽研實驗與理論',
          effect: {
            statName: 'intelligence',
            value: 3
          }
        },
        {
          text: '選擇藝術類活動，發揮創意',
          effect: {
            statName: 'charm',
            value: 3
          }
        }
      ]
    },
    {
      id: 'age_12_martial_competition',
      text: '【年齡：12歲】 【情境】：你參加了校際武術比賽，站在擂台上，對手正虎視眈眈地盯著你。',
      choices: [
        {
          text: '集中火力，發揮最強攻擊力壓制對手。',
          effect: {
            statName: 'attack',
            value: 2
          }
        },
        {
          text: '依靠靈活的身手，不斷迴避對手攻勢。',
          effect: {
            statName: 'agility',
            value: 2
          }
        }
      ]
    }
  ],
  13: [
    {
      id: 'age_13_attack_choice',
      text: '你參加了一個學校的模擬戰爭遊戲，你需要選擇你的角色和武器。你會選擇什麼？',
      choices: [
        {
          text: '選擇一個強大的戰士，使用重型武器。',
          effect: {
            statName: 'attack',
            value: 3
          }
        },
        {
          text: '選擇一個敏捷的刺客，使用匕首。',
          effect: {
            statName: 'agility',
            value: 3
          }
        },
        {
          text: '選擇一個聰明的法師，使用魔法。',
          effect: {
            statName: 'intelligence',
            value: 3
          }
        }
      ]
    },
    {
      id: 'age_13_outdoor_camp',
      text: '【年齡：13歲】 【情境】：學校組織了一場戶外拓展營，這是一個結合體能與社交能力的挑戰。',
      choices: [
        {
          text: '積極參與體能挑戰，鍛煉自己的身體素質。',
          effect: {
            statName: 'constitution',
            value: 1
          }
        },
        {
          text: '主動帶領隊友，展現自己的領導魅力。',
          effect: {
            statName: 'charm',
            value: 2
          }
        }
      ]
    },
    {
      id: 'age_13_intelligence_choice',
      text: '你參加了一個學校的知識競賽，你需要選擇一個科目來參加。你會選擇哪個？',
      choices: [
        {
          text: '選擇數學，展示你的邏輯思維能力。',
          effect: {
            statName: 'intelligence',
            value: 3
          }
        },
        {
          text: '選擇歷史，展示你的記憶力。',
          effect: {
            statName: 'intelligence',
            value: 2
          }
        },
        {
          text: '選擇科學，展示你的實驗能力。',
          effect: {
            statName: 'intelligence',
            value: 1
          }
        }
      ]
    }
  ],
  14: [
    {
      id: 'age_14_constitution_choice',
      text: '你參加了一個學校的運動會，你可以選擇一個項目來參加。你會選擇哪個？',
      choices: [
        {
          text: '選擇長跑，展示你的耐力。',
          effect: {
            statName: 'constitution',
            value: 3
          }
        },
        {
          text: '選擇短跑，展示你的速度。',
          effect: {
            statName: 'agility',
            value: 3
          }
        },
        {
          text: '選擇跳高，展示你的爆發力。',
          effect: {
            statName: 'attack',
            value: 3
          }
        }
      ]
    },
    {
      id: 'age_14_stress_choice',
      text: '面對即將到來的中考壓力，你選擇如何準備？',
      choices: [
        {
          text: '制定嚴格計劃，全力以赴',
          effect: {
            statName: 'intelligence',
            value: 4
          }
        },
        {
          text: '保持運動與學習平衡',
          effect: {
            statName: 'constitution',
            value: 2
          }
        },
        {
          text: '尋求同學間的互助學習',
          effect: {
            statName: 'charm',
            value: 2
          }
        }
      ]
    },
    {
      id: 'age_14_sports_competition',
      text: '【年齡：14歲】 【情境】：全校體育競賽正在進行，你即將參加決賽，這是一次展現你的機會。',
      choices: [
        {
          text: '發揮身體優勢，全力爭取第一名。',
          effect: {
            statName: 'agility',
            value: 2
          }
        },
        {
          text: '在頒獎時自信地發表感言，吸引眾人目光。',
          effect: {
            statName: 'charm',
            value: 1
          }
        }
      ]
    }
  ],
  15: [
    {
      id: 'age_15_charm_choice',
      text: '你參加了一個學校的舞會，你需要選擇一個舞伴。你會選擇誰？',
      choices: [
        {
          text: '選擇一個外貌出眾的同學。',
          effect: {
            statName: 'charm',
            value: 3
          }
        },
        {
          text: '選擇一個聰明的同學。',
          effect: {
            statName: 'intelligence',
            value: 3
          }
        },
        {
          text: '選擇一個運動健將。',
          effect: {
            statName: 'agility',
            value: 3
          }
        }
      ]
    },
    {
      id: 'age_15_interschool_competition',
      text: '【年齡：15歲】 【情境】：一場校際比賽，你需要發揮自身的長處，決定如何應戰。',
      choices: [
        {
          text: '全力進攻，以氣勢壓制對手。',
          effect: {
            statName: 'attack',
            value: 1
          }
        },
        {
          text: '強化體能，確保比賽過程中不易疲勞。',
          effect: {
            statName: 'constitution',
            value: 1
          }
        },
        {
          text: '靠靈活身法閃避攻擊，尋找機會反擊。',
          effect: {
            statName: 'agility',
            value: 1
          }
        }
      ]
    }
  ]
};

export const getRandomScenarioForAge = (age: number): AgeScenario | null => {
  const combinedScenarios = [
    ...(ageScenarios[age] || []),
    ...(multiChoiceScenarios[age] || [])
  ];
  
  if (combinedScenarios.length > 0) {
    const randomIndex = Math.floor(Math.random() * combinedScenarios.length);
    const scenario = combinedScenarios[randomIndex];
    // Add the age to the scenario for reference
    return {
      ...scenario,
      age: age
    };
  }
  return null;
};
