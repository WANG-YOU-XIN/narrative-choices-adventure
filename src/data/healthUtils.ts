
export const checkConstitution = (constitution: number): boolean => {
  // 只檢查體質是否小於 1，並根據 10% 的存活率來判定
  if (constitution < 1) {
    const random = Math.floor(Math.random() * 100) + 1;
    console.log(`Constitution check: ${constitution} < 1, random value: ${random}/100, survival: ${random <= 10}`);
    return random <= 10; // 10% 的機率為 true (存活)
  }
  return true; // 體質大於等於 1 時必定存活
};
