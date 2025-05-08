import React from 'react';
import { Haze as Maze } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Maze size={32} className="mr-2" />
          <h1 className="text-3xl font-bold">AI Maze Solver</h1>
        </div>
        
        <p className="text-center mt-2 max-w-2xl mx-auto text-blue-100">
          Generate random mazes and watch AI algorithms solve them in real-time
        </p>
      </div>
    </header>
  );
};

export default Header;