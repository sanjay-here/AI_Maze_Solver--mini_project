import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0 text-center">
            <p className="text-sm">
              AI Maze Solver. Developed by Sanjay A
            </p>
          </div>
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition duration-200 flex items-center"
              aria-label="GitHub Repository"
            >
              {/* GitHub icon can be added here */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
