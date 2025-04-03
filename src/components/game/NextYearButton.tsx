
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '@/components/ui/button';
import { getStoryNode } from '../../data/storyData';
import { AgeScenario } from '../../data/ageScenarios';
import { toast } from "@/hooks/use-toast";

interface NextYearButtonProps {
  currentAgeScenario: AgeScenario | null;
  resetScenario: () => void;
}

const NextYearButton: React.FC<NextYearButtonProps> = ({ 
  currentAgeScenario, 
  resetScenario 
}) => {
  const { updateStat, increaseAge, setCurrentNode } = useGame();

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

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      <Button
        className="choice-button w-full text-lg py-4 bg-game-primary hover:bg-game-accent text-white"
        onClick={() => {
          // Apply the scenario effect now (for scenarios without choices)
          if (currentAgeScenario && currentAgeScenario.effect) {
            updateStat(currentAgeScenario.effect.statName, currentAgeScenario.effect.value);
            // Show toast notification for stat change
            showStatChangeToast(currentAgeScenario.effect.statName, currentAgeScenario.effect.value);
          }
          
          increaseAge(1);
          resetScenario();
          // Reset the current node to trigger a new age scenario
          const nextNode = getStoryNode('age_progression');
          setCurrentNode(nextNode);
        }}
      >
        下一年
      </Button>
    </div>
  );
};

export default NextYearButton;
