
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '../../context/GameContext';
import { AgeScenario, AgeScenarioChoice } from '../../data/ageScenarios';
import { toast } from "@/hooks/use-toast";

interface ScenarioChoicesProps {
  currentAgeScenario: AgeScenario;
  onChoiceSelected: () => void;
}

const ScenarioChoices: React.FC<ScenarioChoicesProps> = ({ 
  currentAgeScenario, 
  onChoiceSelected 
}) => {
  const { updateStat, increaseAge } = useGame();

  const handleChoiceClick = (choice: AgeScenarioChoice) => {
    // Apply the choice effect to stats
    if (choice.effect) {
      updateStat(choice.effect.statName, choice.effect.value);
      
      // Show toast notification
      const statDisplayNames: Record<string, string> = {
        'attack': '攻擊',
        'constitution': '體質',
        'agility': '敏捷',
        'charm': '魅力',
        'intelligence': '智力'
      };
      
      const displayName = statDisplayNames[choice.effect.statName] || choice.effect.statName;
      const changeText = choice.effect.value > 0 ? `+${choice.effect.value}` : choice.effect.value;
      const toastType = choice.effect.value > 0 ? '提升' : '降低';
      
      toast({
        title: `${displayName}${toastType}`,
        description: `${displayName}值${toastType}了 ${Math.abs(choice.effect.value)} 點`,
        variant: choice.effect.value > 0 ? "default" : "destructive",
      });
    }
    
    // Move to the next year
    increaseAge(1);
    
    // Inform parent that a choice was selected
    onChoiceSelected();
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      {currentAgeScenario.choices.map((choice, index) => (
        <Button
          key={index}
          className="choice-button w-full py-4 bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 rounded-lg text-left px-4 whitespace-normal"
          onClick={() => handleChoiceClick(choice)}
        >
          {choice.text}
        </Button>
      ))}
    </div>
  );
};

export default ScenarioChoices;
