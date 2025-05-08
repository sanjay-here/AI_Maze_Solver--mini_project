import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import { Maze, Position } from '../types';
import { CELL_SIZE } from '../constants';

interface MazeGridProps {
  maze: Maze;
  onCellClick: (position: Position) => void;
  visitedCells: Position[];
  pathCells: Position[];
  isVisualizing: boolean;
}

const MazeGrid: React.FC<MazeGridProps> = ({
  maze,
  onCellClick,
  visitedCells,
  pathCells,
  isVisualizing
}) => {
  const [cellSize, setCellSize] = useState(CELL_SIZE.DESKTOP);
  const [animatingCells, setAnimatingCells] = useState<Record<string, boolean>>({});

  // Determine cell size based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCellSize(CELL_SIZE.MOBILE);
      } else if (window.innerWidth < 1024) {
        setCellSize(CELL_SIZE.TABLET);
      } else {
        setCellSize(CELL_SIZE.DESKTOP);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create a map for quick cell type lookup
  useEffect(() => {
    const newAnimatingCells: Record<string, boolean> = {};
    
    // Mark visited cells for animation
    visitedCells.forEach(cell => {
      const key = `${cell.row},${cell.col}`;
      newAnimatingCells[key] = true;
      
      // Remove animation after 500ms
      setTimeout(() => {
        setAnimatingCells(prev => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      }, 500);
    });
    
    // Mark path cells for animation
    pathCells.forEach(cell => {
      const key = `${cell.row},${cell.col}`;
      newAnimatingCells[key] = true;
      
      // Remove animation after 500ms
      setTimeout(() => {
        setAnimatingCells(prev => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      }, 500);
    });
    
    setAnimatingCells(prev => ({ ...prev, ...newAnimatingCells }));
  }, [visitedCells, pathCells]);

  // Get actual cell type considering visualization
  const getCellType = (row: number, col: number) => {
    const cell = maze[row][col];
    
    // Start and end cells don't change
    if (cell.type === 'start' || cell.type === 'end') {
      return cell.type;
    }
    
    // Check if cell is in the path
    const isInPath = pathCells.some(pos => pos.row === row && pos.col === col);
    if (isInPath) {
      return 'path';
    }
    
    // Check if cell is visited
    const isVisited = visitedCells.some(pos => pos.row === row && pos.col === col);
    if (isVisited) {
      return 'visited';
    }
    
    // Default to original type
    return cell.type;
  };

  return (
    <div className="flex flex-col items-center justify-center mb-8 overflow-auto max-w-full">
      <div 
        className="border border-gray-400 bg-white shadow-md"
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${maze.length}, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${maze[0].length}, ${cellSize}px)`,
        }}
      >
        {maze.map((row, rowIdx) =>
          row.map((_, colIdx) => {
            const position = { row: rowIdx, col: colIdx };
            const cellType = getCellType(rowIdx, colIdx);
            const key = `${rowIdx},${colIdx}`;
            
            return (
              <Cell
                key={key}
                type={cellType}
                position={position}
                size={cellSize}
                onClick={onCellClick}
                isAnimating={animatingCells[key] || false}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MazeGrid;