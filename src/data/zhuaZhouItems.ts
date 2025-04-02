
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

export const getRandomZhuaZhouItems = (count: number = 3): any[] => {
  const shuffled = [...zhuaZhouItems];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};
