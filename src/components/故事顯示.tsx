
import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';

const 故事顯示: React.FC = () => {
  const { currentNode, characterName } = useGame();
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState<string>('auto');

  // Replace placeholder text with character name in story text
  let displayText = currentNode.text;
  if (characterName) {
    displayText = displayText.replace('你', characterName);
  }

  useEffect(() => {
    // Auto-scroll to bottom when text changes
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
    
    // Adjust text container height based on content length
    // but limit to maximum 60% of screen height
    const calculateHeight = () => {
      const textLength = displayText.length;
      const viewportHeight = window.innerHeight;
      let height = 'auto';
      
      // Calculate optimal height - up to 60% of viewport
      if (textLength < 50) {
        // Small text amount
        height = 'auto';
      } else if (textLength < 200) {
        // Medium text amount
        height = `${Math.min(viewportHeight * 0.3, viewportHeight * 0.6)}px`;
      } else {
        // Large text amount
        height = `${viewportHeight * 0.6}px`;
      }
      
      setTextHeight(height);
    };
    
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [displayText]);

  return (
    <div 
      className="w-full p-4 bg-opacity-30 bg-gray-900 rounded-lg border border-game-border"
      style={{ maxHeight: '60vh' }}
    >
      <div 
        ref={textRef} 
        className="story-text text-lg text-game-text overflow-y-auto"
        style={{ 
          height: textHeight !== 'auto' ? textHeight : 'auto',
          maxHeight: '60vh' 
        }}
      >
        {displayText}
      </div>
    </div>
  );
};

export default 故事顯示;
