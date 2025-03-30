
import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

const 故事顯示: React.FC = () => {
  const { currentNode } = useGame();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when text changes
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [currentNode.text]);

  return (
    <div className="w-full h-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border">
      <div ref={textRef} className="story-text text-lg text-game-text h-full overflow-y-auto">
        {currentNode.text}
      </div>
    </div>
  );
};

export default 故事顯示;
