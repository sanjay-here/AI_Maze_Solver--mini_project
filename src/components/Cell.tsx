import React from 'react';
import { CellType, Position } from '../types';
import { CELL_COLORS } from '../constants';

interface CellProps {
  type: CellType;
  position: Position;
  size: number;
  onClick: (position: Position) => void;
  isAnimating?: boolean;
}

const Cell: React.FC<CellProps> = ({ 
  type, 
  position, 
  size, 
  onClick,
  isAnimating = false
}) => {
  const handleClick = () => {
    onClick(position);
  };

  // Get cell color based on type
  const backgroundColor = CELL_COLORS[type];
  
  return (
    <div
      className={`
        border border-gray-300 
        transition-all duration-200 ease-in-out
        ${isAnimating && type === 'visited' ? 'scale-90' : ''}
        ${isAnimating && type === 'path' ? 'scale-95' : ''}
      `}
      style={{
        backgroundColor,
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
      }}
      onClick={handleClick}
      aria-label={`Cell ${position.row},${position.col} (${type})`}
    >
      {type === 'start' && (
        <div className="flex items-center justify-center h-full w-full text-white text-xs font-bold">
          S
        </div>
      )}
      {type === 'end' && (
        <div className="flex items-center justify-center h-full w-full text-white text-xs font-bold">
          E
        </div>
      )}
    </div>
  );
};

export default Cell;