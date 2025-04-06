
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '@/components/ui/button';
import { 
  getRandomScenarioForAge, 
  isMultiChoiceScenario, 
  isSingleChoiceScenario,
  isSpecialScenario,
  getSpecialScenarioId,
  getOriginalSpecialScenario,
  markScenarioAsViewed,
  getSpecialItem
} from '../../data/storyData';
import { AgeScenario } from '../../data/ageScenarios';
import { SingleChoiceScenario } from '../../data/singleChoiceScenarios';
import { toast } from "sonner";

interface NextYearButtonProps {
  currentScenario: AgeScenario | SingleChoiceScenario | null;
  resetScenario: () => void;
}

const NextYearButton: React.FC<NextYearButtonProps> = ({ 
  currentScenario, 
  resetScenario 
}) => {
  const { updateStat, increaseAge, setCurrentNode, characterAge, addToInventory } = useGame();

  // Helper function to show toast notifications for stat changes
  const showStatChangeToast = (statName: string, value: number) => {
    const statDisplayNames: Record<string, string> = {
      'attack': '攻擊',
      'constitution': '體質',
      'agility': '敏捷',
      'charm': '魅力',
      'intelligence': '智力',
      'speed': '速度',
      'health': '生命'
    };

    const displayName = statDisplayNames[statName] || statName;
    const changeText = value > 0 ? `+${value}` : value;
    const isPositive = value > 0;
    
    toast(
      `${displayName}${isPositive ? '提升' : '降低'} ${Math.abs(value)} 點`,
      {
        className: isPositive ? "bg-white text-black" : "bg-red-500 text-black",
        duration: 2000,
      }
    );
  };

  // Helper to handle special scenario effects
  const handleSpecialScenarioEffects = (scenario: any) => {
    if (!isSpecialScenario(scenario)) return;
    
    const specialScenarioId = getSpecialScenarioId(scenario);
    if (!specialScenarioId) return;

    const originalSpecialScenario = getOriginalSpecialScenario(specialScenarioId);
    if (!originalSpecialScenario) return;
    
    // Mark this special scenario as viewed
    markScenarioAsViewed(specialScenarioId);
    
    // Handle special item if applicable
    if (originalSpecialScenario.effect?.itemId) {
      const specialItem = getSpecialItem(originalSpecialScenario.effect.itemId);
      if (specialItem) {
        addToInventory(specialItem);
        
        // Show toast for item acquisition
        toast(
          `獲得特殊物品：${specialItem.name}`,
          {
            className: "bg-white text-black",
            duration: 2000,
          }
        );
        
        // Apply item's stat effect if any
        if (specialItem.effect) {
          updateStat(specialItem.effect.statName, specialItem.effect.value);
          // Show toast for stat change
          showStatChangeToast(specialItem.effect.statName, specialItem.effect.value);
        }
      }
    } 
    
    // Handle stat changes if applicable
    if (originalSpecialScenario.effect?.statChanges) {
      const statChanges = originalSpecialScenario.effect.statChanges;
      
      // Apply each stat change
      Object.entries(statChanges).forEach(([statName, value]) => {
        if (value && typeof value === 'number') {
          updateStat(statName as any, value);
          showStatChangeToast(statName, value);
        }
      });

      // Show toast for special event
      toast(
        `特殊事件：${originalSpecialScenario.title}`,
        {
          className: "bg-white text-black",
          duration: 2000,
        }
      );
    }
  };

  const handleNextYear = () => {
    // Check if this is a special scenario
    if (currentScenario && isSpecialScenario(currentScenario)) {
      handleSpecialScenarioEffects(currentScenario);
    }
    // Apply the scenario effect for regular scenarios (for scenarios without choices)
    else if (currentScenario && currentScenario.effect) {
      updateStat(currentScenario.effect.statName, currentScenario.effect.value);
      // Show toast notification for stat change
      showStatChangeToast(currentScenario.effect.statName, currentScenario.effect.value);
    }
    
    // Clear the current scenario from localStorage
    const storageKey = `scenario_age_${characterAge}`;
    localStorage.removeItem(storageKey);
    
    // Increase age
    increaseAge(1);
    resetScenario();
    
    // Create a transition node to move to age progression
    const ageProgressionNode = {
      id: 'age_progression',
      text: '時光飛逝，你的人生正在展開...',
      choices: []
    };
    
    // Set the current node to our age progression node
    setCurrentNode(ageProgressionNode);
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      <Button
        className="choice-button w-full text-lg py-4 bg-game-primary hover:bg-game-accent text-white whitespace-normal break-words"
        onClick={handleNextYear}
      >
        {currentScenario && isSpecialScenario(currentScenario) 
          ? getOriginalSpecialScenario(getSpecialScenarioId(currentScenario)!)?.buttonText || '繼續'
          : '下一年'}
      </Button>
    </div>
  );
};

export default NextYearButton;
