
import React from 'react';
import 遊戲容器 from '../components/遊戲容器';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full h-screen max-w-md mx-auto overflow-hidden">
        <遊戲容器 />
      </div>
    </div>
  );
};

export default Index;
