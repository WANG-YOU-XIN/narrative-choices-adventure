
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
import { toast } from "@/hooks/use-toast";

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
    const toastType = value > 0 ? '提升' : '降低';
    
    toast({
      title: `${displayName}${toastType}`,
      description: `${displayName}值${toastType}了 ${Math.abs(value)} 點`,
      variant: value > 0 ? "default" : "destructive",
    });
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
        toast({
          title: `獲得特殊物品`,
          description: `你獲得了「${specialItem.name}」！`,
          variant: "default",
        });
        
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
      toast({
        title: `特殊事件：${originalSpecialScenario.title}`,
        description: `你經歷了一個改變命運的事件！`,
        variant: "default",
      });
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
    
    // Get the new scenario for the next age
    const newAge = characterAge + 1;
    const newScenario = getRandomScenarioForAge(newAge);
    
    // If we have a new scenario, update the story text
    if (newScenario) {
      // Store the new scenario in localStorage
      const newStorageKey = `scenario_age_${newAge}`;
      localStorage.setItem(newStorageKey, JSON.stringify(newScenario));
      
      // Create a custom node with the scenario text
      const customNode = {
        id: `custom_age_${newAge}`,
        text: `【年齡：${newAge}歲】\n${newScenario.text}`,
        choices: []  // Empty choices since we'll handle them in the 選項按鈕 component
      };
      
      // Set the current node to our custom node with the scenario text
      setCurrentNode(customNode);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      <Button
        className="choice-button w-full text-lg py-4 bg-game-primary hover:bg-game-accent text-white"
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
