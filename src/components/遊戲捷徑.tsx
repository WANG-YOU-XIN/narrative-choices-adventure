
import React from 'react';
import { Button } from "@/components/ui/button";
import { useGame } from '../context/GameContext';
import { Gamepad2 } from 'lucide-react';
import { useToast } from "@/components/ui/toast";

const 遊戲捷徑: React.FC = () => {
  const { startGame, gameStarted } = useGame();
  const { toast } = useToast();

  const handleStartGame = () => {
    // Start the game with default values
    startGame('玩家', 'male');
    
    toast({
      title: "遊戲已啟動",
      description: "歡迎開始你的人生冒險！",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={handleStartGame}
        className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
        aria-label="快速開始遊戲"
      >
        <Gamepad2 className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default 遊戲捷徑;
