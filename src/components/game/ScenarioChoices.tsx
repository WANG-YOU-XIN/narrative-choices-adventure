
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '@/components/ui/button';
import { AgeScenario } from '../../data/ageScenarios';
import { toast } from "@/hooks/use-toast";
import { getStoryNode } from '../../data/storyData';

interface ScenarioChoicesProps {
  currentAgeScenario: AgeScenario;
  onChoiceSelected: () => void;
}

const ScenarioChoices: React.FC<ScenarioChoicesProps> = ({ 
  currentAgeScenario, 
  onChoiceSelected 
}) => {
  const { updateStat, increaseAge, setCurrentNode, characterAge } = useGame();

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

  // Function to handle choice selection and advance to next year
  const handleChoiceAndAdvance = (choiceIndex: number) => {
    const choice = currentAgeScenario.choices[choiceIndex];
    
    // Apply the effect from the choice
    if (choice.effect) {
      updateStat(choice.effect.statName, choice.effect.value);
      // Show toast notification for stat change
      showStatChangeToast(choice.effect.statName, choice.effect.value);
    }
    
    // Hide the choices after selection
    onChoiceSelected();
    
    // Clear the current scenario from localStorage
    // Use the age from the scenario if available, otherwise use characterAge from context
    const ageToUse = currentAgeScenario.age !== undefined ? currentAgeScenario.age : characterAge;
    const storageKey = `scenario_age_${ageToUse}`;
    localStorage.removeItem(storageKey);
    
    // Increase age and progress to next year
    increaseAge(1);
    
    // Reset the current node to trigger a new age scenario
    const nextNode = getStoryNode('age_progression');
    setCurrentNode(nextNode);
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      {currentAgeScenario.choices.map((choice, index) => (
        <Button
          key={index}
          className="choice-button w-full text-lg py-4 bg-game-primary hover:bg-game-accent text-white"
          onClick={() => handleChoiceAndAdvance(index)}
        >
          {choice.text}
        </Button>
      ))}
    </div>
  );
};

export default ScenarioChoices;
