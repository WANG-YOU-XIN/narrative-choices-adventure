
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dice1 } from 'lucide-react';

interface 角色詳細資料表單Props {
  name: string;
  onNameChange: (newName: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  remainingPoints: number;
}

const 角色詳細資料表單: React.FC<角色詳細資料表單Props> = ({ 
  name, 
  onNameChange, 
  onSubmit, 
  remainingPoints 
}) => {
  // Custom fun Chinese names
  const funnyNames = [
    '騎著蝸牛追火箭', '油炸皮卡丘', '吃可愛長大的', '帥到被人砍', 
    '我是釘子我怕個錘', '牽著螞蟻去散步', '騎著蚊子嗷嗷飛', '蹲在墳頭嚇鬼',
    '抱著嫦娥烤玉兔', '騎著毛驢闖紅燈', '扛著拖把掃天下', '牽著蝸牛去跑步',
    '騎著烏龜去追龍', '抱著大樹唱征服', '蹲在廁所唱國歌', '騎著鯊魚去蹦迪',
    '吃辣椒不吐葡萄皮', '我是奧特慢', '騎豬看日出', '文藝小流氓',
    '呆萌綜合征', '先生，請自重', '你醜別皺眉', '撩最軟的妹',
    '逗比的胖兒', '西瓜撞地球', '後來的我們', '無情的泡麵',
    '鐵鎚妹妹', '悲傷在舞蹈', '被自己帥醒', '奶油莓莓卷',
    '燃燒的胸毛', '人醜脾氣大', '我叫萌萌噠', '毛驢倒著騎',
    '紅杏立牆頭', '壹只流浪豬', '酷到不能行', '我是釘子我怕個錘'
  ];
  
  // Generate a random funny name
  const generateRandomName = () => {
    const randomIndex = Math.floor(Math.random() * funnyNames.length);
    onNameChange(funnyNames[randomIndex]);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">角色資料</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              id="name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="輸入你的名字"
              className="flex-1 text-black"
            />
            <Button 
              type="button"
              onClick={generateRandomName} 
              className="bg-white text-black hover:bg-gray-200 p-2"
              title="隨機生成名字"
            >
              <Dice1 size={20} />
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <Button type="submit" className="w-full" disabled={name.trim() === '' || remainingPoints > 0}>
            開始遊戲
          </Button>
        </div>
      </form>
    </div>
  );
};

export default 角色詳細資料表單;
