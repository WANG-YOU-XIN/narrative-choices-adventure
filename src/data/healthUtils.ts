
export const checkConstitution = (constitution: number): boolean => {
  // 只檢查體質是否小於等於 2，並根據 10% 的存活率來判定
  if (constitution <= 2) {
    const random = Math.floor(Math.random() * 100) + 1;
    console.log(`Constitution check: ${constitution} <= 2, random value: ${random}/100, survival: ${random <= 10}`);
    return random <= 10; // 10% 的機率為 true (存活)
  }
  return true; // 體質大於 2 時必定存活
};
